import React, { FC } from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { majorScale, Pane, Heading, Spinner, Paragraph } from 'evergreen-ui'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Post } from '../../types'
import Container from '../../components/container'

import matter from 'gray-matter'
import { posts as postsFromCMS } from '../../cms/content'
import HomeNav from '../../components/homeNav'
import { returnFilesFromFolder } from '../../utils/readFromFs'

import path from 'path'

import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { readFileFromFolder } from '../../utils/readFromFs'

const BlogPost: FC<Post> = ({ source, frontMatter }) => {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <Pane width="100%" height="100%">
        <Spinner size={48} />
      </Pane>
    )
  }
  return (
    <Pane>
      <Head>
        <title>{`Known Blog | ${frontMatter.title}`}</title>
        <meta name="description" content={frontMatter.summary} />
      </Head>
      <header>
        <HomeNav />
      </header>
      <main>
        <Container>
          <Heading fontSize="clamp(2rem, 8vw, 6rem)" lineHeight="clamp(2rem, 8vw, 6rem)" marginY={majorScale(3)}>
            {frontMatter.title}
          </Heading>
          <Paragraph marginBottom={majorScale(2)}>{frontMatter.summary}</Paragraph>
          {/* <Pane>{content}</Pane> */}
          <Pane> <MDXRemote {...source} /> </Pane>
        </Container>
      </main>
    </Pane>
  )
}

/**
 * Need to get the paths here
 * then the the correct post for the matching path
 * Posts can come from the fs or our CMS
 */

interface StaticPaths extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths<StaticPaths> = async (context) => {
  // const cmsPosts = await postsFromCMS.draft.map((post) => {
  //   const { data } = matter(post)
  //   return data
  // })

  const postsPath = path.join(process.cwd(), 'posts')
  const postsMatterContent: ReturnType<typeof matter>[] = await returnFilesFromFolder(postsPath, matter)
  const fsPosts = postsMatterContent.map(({ data }) => data)
  const paths = fsPosts.map(({ slug }) => ({ params: { slug } }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Post, StaticPaths> = async ({ params, preview }) => {
  let cmsPost
  cmsPost =
    (await (preview ? postsFromCMS.draft : postsFromCMS.published)
      .filter((post) => {
        return matter(post).data.slug === params.slug
      })
      .map((foundPost) => matter(foundPost))[0]) ?? undefined

  if (!cmsPost) {
    const postsPath = path.join(process.cwd(), 'posts', params.slug + '.mdx')

    const file = await readFileFromFolder(postsPath)
    cmsPost = matter(file)
  }
  const mdxSource = await serialize(cmsPost.content, { scope: cmsPost.data })

  return {
    props: {
      frontMatter: cmsPost.data,
      source: mdxSource,
    },
    revalidate: 30,
  }
}

export default BlogPost
