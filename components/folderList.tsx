import { Pane, majorScale, Menu, FolderCloseIcon, ListIcon, FolderOpenIcon } from 'evergreen-ui'
import React, { FC } from 'react'
import { useRouter } from 'next/router'
import { Folder } from '../types'

const FolderList: FC<{ folders: Folder[]; currentOpenFolder: string }> = ({ folders, currentOpenFolder }) => {
  const router = useRouter()

  if (!folders.length) {
    return null
  }

  return (
    <Pane padding={majorScale(2)}>
      <Menu>
        <Menu.Item key={'folder_list+default'} icon={ListIcon} onClick={() => router.push(`/app/`)}>
          <strong>FOLDER LIST</strong>
        </Menu.Item>

        {folders?.map((folder) => (
          <Menu.Item
            key={folder._id}
            icon={folder._id === currentOpenFolder ? FolderOpenIcon : FolderCloseIcon}
            onClick={() => router.push(`/app/${folder._id}`)}
          >
            {folder._id === currentOpenFolder ? <strong>{folder.name}</strong> : folder.name}
          </Menu.Item>
        ))}
      </Menu>
    </Pane>
  )
}

FolderList.defaultProps = {
  folders: [],
  currentOpenFolder: '',
}

export default FolderList
