import { memo, useState } from 'react'
import { Icon } from '@iconify/react'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Tooltip } from '@mantine/core'

import BigLogo from '../Logos/BigLogo'
import Logo from '../Logos/Logo'
import classes from './sidebar.module.css'

const data = [
  { link: '', label: 'Home', icon: 'solar:home-2-broken' },
  { link: '/hello', label: 'Marketplace', icon: 'solar:shop-broken' },
  { link: '/communities', label: 'Communities', icon: 'fluent:people-community-16-regular' },
  { link: '/upload', label: 'Upload Music', icon: 'prime:upload' },
  { link: '/event', label: 'Events', icon: 'streamline:entertainment-ticket-hobby-ticket-event-entertainment-stub-theater' },
  { link: '/assets', label: 'Assets', icon: 'fluent:collections-20-regular' },
  { link: '/pool', label: 'Pool', icon: 'solar:play-broken' },
  { link: '/profile', label: 'Profile', icon: 'line-md:account' },
]

const Links = memo(() => {
  return data.map((item) => (
    <Tooltip key={item.label} label={item.label} position="right" transitionProps={{ duration: 0 }}>
      <NavLink className={classes.link} data-path={item.link} to={item.link}>
        <Icon className={classes.linkIcon} icon={item.icon} width="24" stroke="1.5" />
        <span className="whitespace-nowrap">{item.label}</span>
      </NavLink>
    </Tooltip>
  ))
})

const AppSideBar = () => {
  const [minimize, setMinimize] = useState(innerWidth >= 1280 ? false : true)
  const { pathname } = useLocation()

  const sliced = pathname.split('/')[1]

  const toggle = () => {
    setMinimize((prev) => !prev)
  }

  return (
    <nav data-minimize={minimize} data-path={sliced} className={`${classes.navbar} transition-all`}>
      <div className="mb-12 mt-8">{minimize ? <Logo /> : <BigLogo />}</div>
      <div className={classes.navbarMain}>
        <Links />
      </div>

      <div className="h-max mt-5 space-y-5">
        <button className={`${classes.link}`} onClick={(event) => event.preventDefault()}>
          <Icon icon={'solar:logout-broken'} width="24" className="shrink-0" />
          <span className="whitespace-nowrap">Logout</span>
        </button>
        <button className={`${classes.link} ${classes.resizedBtn} ml-auto`} onClick={toggle}>
          <Icon icon="clarity:two-way-arrows-line" width="24" className="shrink-0" />
        </button>
      </div>
    </nav>
  )
}

export default AppSideBar
