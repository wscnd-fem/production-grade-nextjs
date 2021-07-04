import React, { useState, useEffect, useRef } from 'react'
import { signIn, useSession } from 'next-auth/client'
import { Pane, majorScale, Text, Avatar } from 'evergreen-ui'
import Logo from '../components/logo'

import { useRouter } from 'next/router'

import SocialButton from '../components/socialButton'
import useInterval from '@use-it/interval'

const Signin = () => {
  const [session, loading] = useSession()
  const [redirecting, setRedirecting] = useState(false)
  const [countdownRedirect, setCountdownRedirect] = useState(0)
  const router = useRouter()

  const timeoutRedirectingRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (session && !loading) {
      timeoutRedirectingRef.current = setTimeout(() => {
        setRedirecting(true)
      }, 1000)
    }
    return () => clearTimeout(timeoutRedirectingRef.current)
  }, [router, session, loading])

  useEffect(() => {
    if (session && !loading) {
      if (countdownRedirect === 1) {
        router.push('/app')
      }
    }
  }, [countdownRedirect, router, loading, session])

  useInterval(() => {
    if (redirecting) {
      setCountdownRedirect((previous) => previous + 1)
    }
  }, 600)

  return (
    <Pane height="100vh" width="100vw" display="flex">
      <Pane
        height="100%"
        width="50%"
        borderRight
        paddingX={majorScale(8)}
        paddingY={majorScale(5)}
        background="#47B881"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Pane>
          <Logo color="white" fontSize="60px" />
          <Pane marginTop={majorScale(2)}>
            <Text color="white" fontSize="22px">
              Sign in.
            </Text>
          </Pane>
        </Pane>
      </Pane>
      <Pane
        height="100%"
        width="50%"
        background="tint2"
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingX={majorScale(7)}
      >
        <Pane width="100%" textAlign="center">
          {loading && !session ? (
            <Text>Loading...</Text>
          ) : session ? (
            <>
              <Pane textAlign="center" display="flex" flexDirection="column" alignItems="center">
                <Avatar src={session.user.image} size={70} />
                <Text>Welcome {session.user.name}</Text>
              </Pane>
              {redirecting ? <Text display="block">Loading your docs {'.'.repeat(countdownRedirect)}</Text> : null}
            </>
          ) : (
            <SocialButton type="github" onClick={() => signIn('github')} />
          )}
        </Pane>
      </Pane>
    </Pane>
  )
}

export default Signin
