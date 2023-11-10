import { Icon } from '@iconify/react'
import { ActionIcon, Button, Tooltip } from '@mantine/core'
import { memo } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import BigLogo from '../General/BigLogo'
import Logo from '../General/Logo'
import classes from './sidebar.module.css'

const data = [
  { link: '', label: 'Home', icon: 'solar:home-2-broken' },
  { link: '/marketplace', label: 'Marketplace', icon: 'solar:shop-broken' },
  // { link: '/communities', label: 'Communities', icon: 'fluent:people-community-16-regular' },
  { link: '/upload', label: 'Upload Music', icon: 'prime:upload' },
  // { link: '/events', label: 'Events', icon: 'streamline:entertainment-ticket-hobby-ticket-event-entertainment-stub-theater' },
  { link: '/earnings', label: 'My Earnings', icon: 'bi:currency-dollar' },
  { link: '/streams', label: 'My Streams', icon: 'solar:play-broken' },
  { link: '/profile', label: 'Profile', icon: 'line-md:account' },
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
  const sliced = pathname.split('/')

  const icon = <Icon icon="octicon:plus-16" stroke="2" width={20} />

  return (
    <nav data-path={sliced[1]} className={`${classes.navbar} transition-all`} data-sub-bg={sliced[2] === 'music'}>
      <Logo className={classes.svg1} /> <BigLogo className={classes.svg2} />
      <div className={classes.navbarMain}>
        <Links />
        <div className="w-full xl:pr-5 pl-1 xl:pl-2 mt-14 mb-10">
          <Link to="/create" className="md:hidden xl:block">
            <Button size="lg" fullWidth radius={30} leftSection={icon}>
              Create
            </Button>
          </Link>
          <Link to="/create" className="hidden md:block xl:hidden">
            <ActionIcon radius={50} size="xl" className="w-20">
              {icon}
            </ActionIcon>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default AppSideBar
