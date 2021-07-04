import { Pane, majorScale, Menu, FolderCloseIcon } from 'evergreen-ui'
import React, { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Folder } from '../types'

const FolderList: FC<{ folders: Folder[] }> = ({ folders = [] }) => {
  const router = useRouter()

  if (!folders.length) {
    return null
  }

  return (
    <Pane padding={majorScale(2)}>
      <Menu>
        {folders?.map((folder) => (
          <Menu.Item key={folder._id} icon={FolderCloseIcon} onClick={() => router.push(`/app/${folder._id}`)}>
            {folder.name}
          </Menu.Item>
        ))}
      </Menu>
    </Pane>
  )
}

FolderList.defaultProps = {
  folders: [],
}

export default FolderList
