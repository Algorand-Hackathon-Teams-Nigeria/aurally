import { Icon } from '@iconify/react'
import { ActionIcon, Indicator, TextInput } from '@mantine/core'
import BigLogo from '../General/BigLogo'
import ConnectButton from '../General/ConnectButton'
import SideDrawer from '../SideDrawer'
import classes from './appnav.module.css'

const SearchBar = () => {
  return <TextInput classNames={{ input: classes.searchbar }} placeholder="Search music, artists, playlist" />
}

const SearchAndFilter = () => {
  return (
    <div className="w-full flex md:hidden items-center gap-4 mt-4">
      <div className="flex-1">
        <SearchBar />
      </div>
      <Icon className={classes.filterIcon} icon="solar:hamburger-menu-broken" width={28} />
    </div>
  )
}

const AppNav = () => {
  return (
    <section className={`${classes.section} transition-colors`}>
      <header className={`${classes.appNav}`}>
        <div className="flex items-center md:hidden">
          <SideDrawer />
          <BigLogo className="w-[103px] ml-2" />
        </div>
        <div className="w-full hidden md:block">
          <SearchBar />
        </div>
        <div className="flex items-center ml-5 lg:ml-14">
          <ActionIcon variant="filled" aria-label="Settings" color="#1E1E1E" radius={'xl'} size={'xl'} mr={10}>
            <Indicator color="red" size={8} offset={4}>
              <Icon icon="carbon:notification" width={20} />
            </Indicator>
          </ActionIcon>
          <div className="md:hidden">
            <ActionIcon variant="filled" aria-label="Settings" color="purple" radius={'xl'} size={'xl'}>
              <Icon icon="line-md:account" />
            </ActionIcon>
          </div>
          <div className="hidden md:inline-block">
            <ConnectButton />
          </div>
        </div>
      </header>
      <SearchAndFilter />
    </section>
  )
}

export default AppNav
