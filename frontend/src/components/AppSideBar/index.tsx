import { Icon } from '@iconify/react'
import { ActionIcon, Button, Menu, Tooltip } from '@mantine/core'
import { memo } from 'react'
import { Link, NavLink, useLocation, useParams } from 'react-router-dom'
import BigLogo from '../General/BigLogo'
import Logo from '../General/Logo'
import classes from './sidebar.module.css'
import { useMediaQuery } from '@mantine/hooks'

const data = [
  { link: '/dapp', label: 'Home', icon: 'solar:home-2-broken' },
  { link: '/dapp/marketplace', label: 'Marketplace', icon: 'solar:global-outline' },
  { link: '/dapp/dao', label: 'DAO', icon: 'material-symbols-light:chess-outline' },
  { link: '/dapp/events', label: 'Events', icon: 'tabler:ticket' },
  { link: '/dapp/nfts', label: 'My Nfts', icon: 'solar:play-broken' },
  { link: '/dapp/communities', label: 'Communities', icon: 'fluent:people-community-16-regular' },
  { link: '/dapp/profile', label: 'Profile', icon: 'line-md:account' },
]

export const Links = memo(({ isMobile }: { isMobile?: boolean }) => {
  return data.map((item) =>
    isMobile ? (
      <NavLink key={item.label} className={classes.link} data-path={item.link} to={item.link}>
        <Icon className={classes.linkIcon} icon={item.icon} width="24" stroke="1.5" />
        <span className="whitespace-nowrap">{item.label}</span>
      </NavLink>
    ) : (
      <Tooltip key={item.label} label={item.label} position="right" transitionProps={{ duration: 0 }}>
        <NavLink className={classes.link} data-path={item.link} to={item.link}>
          <Icon className={classes.linkIcon} icon={item.icon} width="24" stroke="1.5" />
          <span className="whitespace-nowrap">{item.label}</span>
        </NavLink>
      </Tooltip>
    ),
  )
})

const AppSideBar = () => {
  const { pathname } = useLocation()
  const { forumId } = useParams()
  const matched = useMediaQuery('(min-width: 1024px)',window.innerWidth >= 1024)
  const sliced = pathname.split('/')

  const icon = <Icon icon="octicon:plus-16" stroke="2" width={20} />

  const hideNav = sliced[3] === 'music' || (sliced[2] === 'communities' && !!forumId && !matched)

  return (
    <nav data-path={sliced[2] || ''} className={`${classes.navbar} transition-all`} data-sub-bg={hideNav}>
      <Logo className={classes.svg1} /> <BigLogo className={classes.svg2} />
      <div className={classes.navbarMain}>
        <Links />
        <div className="w-full xl:pr-5 pl-1 xl:pl-2 mt-14 mb-10">
          <Menu width={200} openDelay={100} closeDelay={400} offset={14}>
            <Menu.Target>
              <div>
                <div className="hidden xl:block">
                  <Button size="lg" fullWidth radius={30} leftSection={icon}>
                    Create
                  </Button>
                </div>
                <div className="xl:hidden">
                  <ActionIcon radius={50} size="xl" className="w-20">
                    {icon}
                  </ActionIcon>
                </div>
              </div>
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
    </nav>
  )
}

export default AppSideBar
