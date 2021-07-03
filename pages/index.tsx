import React, { FC } from 'react'
import { Pane, majorScale } from 'evergreen-ui'
import Container from '../components/container'
import Hero from '../components/hero'
import HomeNav from '../components/homeNav'
import FeatureSection from '../components/featureSection'
import { home } from '../cms/content'

import { GetStaticProps } from 'next'

interface PageProps {
  content: { hero: any; features: any[] }
}

const Home: FC<PageProps> = ({ content }) => {
  return (
    <Pane>
      <header>
        <HomeNav />
        <Container>
          <Hero content={content.hero} />
        </Container>
      </header>
      <main>
        {content.features.map((feature, i) => (
          <FeatureSection
            key={feature.title}
            title={feature.title}
            body={feature.body}
            image="/docs.png"
            invert={i % 2 === 0}
          />
        ))}
      </main>
      <footer>
        <Pane background="overlay" paddingY={majorScale(9)}>
          <Container>hello</Container>
        </Pane>
      </footer>
    </Pane>
  )
}

/**
 * Should really get this content from our CMS
 */


export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      content: context.preview ? home.draft : home.published,
    },
  }
}

export default Home
