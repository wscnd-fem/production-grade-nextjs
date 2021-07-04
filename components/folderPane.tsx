import React, { FC, useState  } from 'react'
import { Pane, Heading, majorScale, DocumentIcon, Button } from 'evergreen-ui'
import Link from 'next/link'
import { getRandomGradientCss } from '../utils/gradients'
import NewFolderButton from './newFolderButton'
import NewDocDialog from './newDocumentDialog'
import { Folder, Doc } from '../types'
import useDocs from '../hooks/useDocs'
import useCreateDoc from '../hooks/useCreateDoc'

interface PageProps {
  folder: Folder
  docs?: Doc[]
}

const FolderPane: FC<PageProps> = ({ folder, docs }) => {
  const { bg, image } = getRandomGradientCss()
  const [isShown, setIsShown] = useState(false)
  const { data: allDocs } = useDocs(docs, folder._id)
  const { mutateAsync: createDoc } = useCreateDoc()

  const handleNewDoc = async (name: string) => {
    await createDoc({ name, _id: folder._id })
  }

  return (
    <Pane>
      <Pane width="100%" height="200px" backgroundColor={bg} backgroundImage={image} />
      <Pane padding={majorScale(4)}>
        <Pane display="flex" justifyContent="content" alignItems="center" marginBottom={majorScale(4)}>
          <NewFolderButton tooltip="New Document" size={30} onClick={() => setIsShown(true)} />
          <Heading size={900} marginLeft={majorScale(2)}>
            {folder.name}
          </Heading>
        </Pane>

        <Pane display="flex" alignItems="center" flexWrap="wrap">
          {allDocs.map((doc) => (
            <Pane key={doc._id} width="33%">
              <Link href={`/app/${folder._id}/${doc._id}`}>
                <a>
                  <Button intent="none" appearance="minimal" iconBefore={DocumentIcon} height={48} color="tint1">
                    {doc.name}
                  </Button>
                </a>
              </Link>
            </Pane>
          ))}
        </Pane>
      </Pane>

      <NewDocDialog isShown={isShown} onNewDoc={handleNewDoc} close={() => setIsShown(false)} />
    </Pane>
  )
}

FolderPane.defaultProps = {
  docs: [],
}

export default FolderPane
