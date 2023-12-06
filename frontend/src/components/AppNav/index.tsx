import { Icon } from '@iconify/react'
import { TextInput } from '@mantine/core'
import BigLogo from '../General/BigLogo'
import ConnectButton from '../General/ConnectButton'
import SideDrawer from '../SideDrawer'
import classes from './appnav.module.css'
import NotifcationDrawer from '../NotifcationDrawer'
import { useMediaQuery } from '@mantine/hooks'
import { useNavigate } from 'react-router-dom'
import { modals } from '@mantine/modals'
import { useState } from 'react'

const SearchBar = () => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
  }

  const clear = () => {
    setSearch('')
  }

  const RightIcon = (
    <Icon
      icon={search ? 'material-symbols-light:close' : 'iconamoon:search-thin'}
      fontSize={24}
      color="white"
      className="shrink-0"
      onClick={clear}
    />
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (search.length >= 3) {
      navigate(`marketplace?query=${search}`)
    }
  }

  return (
    // <Popover width="target" position="bottom-start" radius={16} shadow="md" opened={opened} onChange={close}>
    //   <Popover.Target>

    //   </Popover.Target>
    //   <Popover.Dropdown bg="var(--mantine-color-body)" className="overflow-hidden">
    //     <LoadingOverlay visible={isLoading} zIndex={1} overlayProps={{ radius: 'lg', blur: 2, bg: '#ffffff10' }} />
    //     <div className="w-full h-[200px] rounded-xl">
    //       <span>Hello</span>
    //     </div>
    //   </Popover.Dropdown>
    // </Popover>
    <form onSubmit={handleSubmit} className="flex-1 max-w-xl">
      <TextInput
        value={search}
        onChange={handleChange}
        classNames={{ input: classes.searchbar, section: 'w-max px-6 shrink-0' }}
        placeholder="Search music, artists, playlist"
        rightSection={RightIcon}
      />
    </form>
  )
}

const AppNav = () => {
  const matched = useMediaQuery('(min-width: 768px)', window.innerWidth >= 768)
  const openSearchModal = () => {
    modals.openContextModal({
      fullScreen: true,
      modal: 'search',
      withCloseButton: false,
      classNames: { content: 'rounded-none' },
      innerProps: {},
    })
  }

  return (
    <header className={`${classes.appNav}`}>
      {matched ? (
        <SearchBar />
      ) : (
        <div className="flex items-center">
          <BigLogo className="w-[103px] ml-2" />
        </div>
      )}
      <div className="flex items-center ml-5 md:ml-10 lg:ml-14 gap-5 md:gap-4">
        <Icon onClick={openSearchModal} icon="iconamoon:search-thin" className="md:hidden" fontSize={24} />
        <NotifcationDrawer />
        {matched ? <ConnectButton /> : <SideDrawer />}
      </div>
    </header>
  )
}

export default AppNav
