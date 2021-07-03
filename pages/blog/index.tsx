import React from 'react'
import { Pane, majorScale } from 'evergreen-ui'
import matter from 'gray-matter'
import orderby from 'lodash.orderby'
import Container from '../../components/container'
import HomeNav from '../../components/homeNav'
import { returnFilesFromFolder } from '../../utils/readFromFs'
import PostPreview from '../../components/postPreview'
import { posts as postsFromCMS } from '../../cms/content'
import path from 'path'

import { GetStaticProps } from 'next'

const Blog = ({ posts }) => {
  // console.log('posts:', posts)
  return (
    <Pane>
      <header>
        <HomeNav />
      </header>
      <main>
        <Container>
          {posts.map((post) => (
            <Pane key={post.title} marginY={majorScale(5)}>
              <PostPreview post={post} />
            </Pane>
          ))}
        </Container>
      </main>
    </Pane>
  )
}

/**
 * Need to get the posts from the
 * fs and our CMS
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const cmsPosts = await (context.preview ? postsFromCMS.draft : postsFromCMS.published).map((post) => {
    const { data } = matter(post)
    // console.log('content:', content)
    return data
  })

  const postsPath = path.join(process.cwd(), 'posts')
  const postsMatterContent: ReturnType<typeof matter>[] = await returnFilesFromFolder(postsPath, matter)

  const fsPosts = postsMatterContent.map(({ data }) => data)

  return {
    props: {
      posts: [...cmsPosts, ...fsPosts],
    },
  }
}
export default Blog
