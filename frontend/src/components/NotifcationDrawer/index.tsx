import { Icon } from '@iconify/react'
import { ActionIcon, Drawer, Indicator } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import classes2 from './notification.module.css'

const NotifcationDrawer = () => {
  const [opened, setOpened] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpened(false)
  }, [pathname])

  const close = () => {
    setOpened(false)
  }

  const toggle = () => {
    setOpened((prev) => !prev)
  }

  return (
    <>
      <ActionIcon onClick={toggle} variant="filled" aria-label="Settings" color="#1E1E1E" radius={'xl'} size={'xl'} mr={10}>
        <Indicator color="red" size={8} offset={4}>
          <Icon icon="carbon:notification" width={20} />
        </Indicator>
      </ActionIcon>
      <Drawer.Root position="right" classNames={{ root: classes2.root }} opened={opened} onClose={close}>
        <Drawer.Overlay />
        <Drawer.Content classNames={{ content: classes2.content }}>
          <Drawer.Header classNames={{ header: classes2.header }}>
            <Drawer.Title classNames={{ title: classes2.title }}>Notifications</Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body classNames={{ body: classes2.body }}>
            <div className="flex-1 flex justify-center items-center">
              <div className="flex items-center gap-5">
                No Notification <Icon icon={'ep:mute-notification'} />
              </div>
            </div>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  )
}

export default NotifcationDrawer
