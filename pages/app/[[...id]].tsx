import React, { FC, useState } from 'react'
import { Pane, Dialog, majorScale } from 'evergreen-ui'
import { useRouter } from 'next/router'
import Logo from '../../components/logo'
import FolderList from '../../components/folderList'
import NewFolderButton from '../../components/newFolderButton'
import User from '../../components/user'
import FolderPane from '../../components/folderPane'
import DocPane from '../../components/docPane'
import NewFolderDialog from '../../components/newFolderDialog'

import { useSession, getSession } from 'next-auth/client'
import type { Session } from 'next-auth'

import { ParsedUrlQuery } from 'querystring'
import { GetServerSideProps } from 'next'
import { Folder, Doc } from '../../types'

import { FolderModel, DocModel, connectToDB } from '../../db'

interface PageProps {
  folders?: Folder[]
  currentFolder?: Folder
  currentDoc?: Doc
  docsFromCurrentFolder?: Doc[]
  session?: Session
}

const App: FC<PageProps> = ({
  // folders = [{ _id: 'hello', name: 'folder name', createdat: new date().todatestring(), createdby: 'asdfasfd' }],
  folders,
  currentDoc,
  currentFolder,
  docsFromCurrentFolder,
}) => {
  const router = useRouter()
  const [newFolderIsShown, setIsShown] = useState(false)
  const [session, loading] = useSession()

  const Page = () => {
    if (currentDoc) {
      return <DocPane folder={currentFolder} doc={currentDoc} />
    }

    if (currentFolder) {
      return <FolderPane folder={currentFolder} docs={docsFromCurrentFolder} />
    }

    return null
  }

  if (loading) {
    return null
  }

  if (!session && !loading) {
    return (
      <Dialog
        isShown
        title="Session expired"
        confirmLabel="Ok"
        hasCancel={false}
        hasClose={false}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEscapePress={false}
        onConfirm={() => router.push('/signin')}
      >
        Sign in to continue
      </Dialog>
    )
  }

  return (
    <Pane position="relative">
      <Pane width={300} position="absolute" top={0} left={0} background="tint2" height="100vh" borderRight>
        <Pane padding={majorScale(2)} display="flex" alignItems="center" justifyContent="space-between">
          <Logo />
          <NewFolderButton onClick={() => setIsShown(true)} />
        </Pane>
        <Pane>
          <FolderList folders={folders} />{' '}
        </Pane>
      </Pane>
      <Pane marginLeft={300} width="calc(100vw - 300px)" height="100vh" overflowY="auto" position="relative">
        <User
          user={{
            id: session.user.name,
            email: session.user.email,
            image: session.user.image,
            name: session.user.name,
          }}
        />
        <Page />
      </Pane>
      <NewFolderDialog close={() => setIsShown(false)} isShown={newFolderIsShown} onNewFolder={() => {}} />
    </Pane>
  )
}

/**
 * Catch all handler. Must handle all different page
 * states.
 * 1. Folders - none selected
 * 2. Folders => Folder selected
 * 3. Folders => Folder selected => Document selected
 *
 * An unauth user should not be able to access this page.
 *
 * @param context
 */

interface ServerSideProps extends ParsedUrlQuery {
  id: string[]
}

export const getServerSideProps: GetServerSideProps<PageProps, ServerSideProps> = async (ctx) => {
  const session = await getSession(ctx)

  if (session) {
    const props: PageProps = { session }

    const { db } = await connectToDB()

    if (session.user.id) {
      // if (ctx.params.id && session.user.id) {
      props.folders = await FolderModel.getFolders(db, session.user.id)

      const [folderFromParams, docFromParams] = ctx.params?.id ?? []

      if (folderFromParams) {
        props.currentFolder = props.folders.find((folder) => folder._id === folderFromParams)

        props.docsFromCurrentFolder = await DocModel.getDocsByFolderId(db, props.currentFolder?._id)

        if (docFromParams) {
          props.currentDoc = props.docsFromCurrentFolder.find((docs) => docs._id === docFromParams)
        }
      }

      console.log('folderFromParams:', folderFromParams)
      console.log('docFromParams:', docFromParams)

      console.log('currentFolder:', props.currentFolder)
      console.log('docsFromCurrentFolder:', props.docsFromCurrentFolder)

      console.log('ctx params:', ctx.params)
      console.log('session:', session)

      return {
        props,
      }
    }
  }

  return {
    props: { session },
  }
}

export default App
