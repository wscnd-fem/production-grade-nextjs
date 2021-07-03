import React, { FC, useEffect } from 'react'
import { Pane, majorScale, Text, Button, Spinner } from 'evergreen-ui'
import NextLink from 'next/link'
import { useSession } from 'next-auth/client'
import Container from './container'
import Logo from './logo'

interface PageProps {
  links?: { name: string; link: string }[]
}

const HomeNav: FC<PageProps> = ({ links }) => {
  const [session, loading] = useSession()

  useEffect(() => {
    console.log('loading:', loading)
    console.log('session:', session)
  })

  return (
    <nav>
      <Pane width="100vw" paddingY={majorScale(1)} borderBottom height={majorScale(9)}>
        <Container height="100%">
          <Pane display="flex" justifyContent="space-between" alignItems="center" height="100%">
            <Logo />

            <Pane display="flex" justifyContent="space-around" alignItems="center">
              {links && links.length > 0
                ? links.map((link) => (
                    <Pane paddingX={majorScale(3)} key={link.name}>
                      <NextLink href={link.link}>
                        <a>
                          <Text fontSize="16px">{link.name}</Text>
                        </a>
                      </NextLink>
                    </Pane>
                  ))
                : null}

              <Pane paddingX={majorScale(3)}>
                {loading ? (
                  <Spinner  size={30}/>
                ) : (
                  <NextLink href={session ? '/app' : '/signin'}>
                    <a>
                      <Button appearance="primary" fontSize="16px">
                        {session ? 'Dashboard' : 'Sign up'}
                      </Button>
                    </a>
                  </NextLink>
                )}
              </Pane>
            </Pane>
          </Pane>
        </Container>
      </Pane>
    </nav>
  )
}

HomeNav.defaultProps = {
  links: [{ name: 'Blog', link: '/blog' }],
}

export default HomeNav
