import { Icon } from '@iconify/react'
import { Burger, Button, Drawer, Menu } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Links } from '../AppSideBar'
import classes from '../AppSideBar/sidebar.module.css'
import ConnectButton from '../General/ConnectButton'
import classes2 from './sidedrawer.module.css'

const SideDrawer = () => {
  const [opened, setOpened] = useState(false)
  const { pathname } = useLocation()

  const sliced = pathname.split('/')

  useEffect(() => {
    setOpened(false)
  }, [pathname])

  const close = () => {
    setOpened(false)
  }

  const toggle = () => {
    setOpened((prev) => !prev)
  }

  const icon = <Icon icon="octicon:plus-16" stroke="2" width={20} />

  return (
    <>
      <Burger opened={opened} onClick={toggle} aria-label="Toggle Side Bar" />
      <Drawer.Root position="right" classNames={{ root: classes2.root }} opened={opened} onClose={close} data-path={sliced[2] || ''}>
        <Drawer.Overlay />
        <Drawer.Content classNames={{ content: classes2.content }}>
          <Drawer.Header classNames={{ header: classes2.header }}>
            <Drawer.Title>
              <ConnectButton />
            </Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body classNames={{ body: classes2.body }}>
            <div className={classes2.navs}>
              <div className={classes.navbarMain}>
                <Links isMobile />
                <Menu width={'target'} openDelay={100} closeDelay={400} offset={14}>
                  <Menu.Target>
                    <Button size="lg" fullWidth radius={30} leftSection={icon}>
                      Create
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item to="/dapp/create/sound" component={Link} leftSection={<Icon icon="mdi:music" />}>
                      Sound NFT
                    </Menu.Item>
                    <Menu.Item to="/dapp/create/art" component={Link} leftSection={<Icon icon="mdi:art" />}>
                      Art NFT
                    </Menu.Item>
                    <Menu.Item to="/dapp/events/create" component={Link} leftSection={<Icon icon="tabler:ticket" />}>
                      Create Event
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
            </div>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  )
}

export default SideDrawer
