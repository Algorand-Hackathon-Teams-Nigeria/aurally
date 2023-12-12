import { Icon } from '@iconify/react'
import { LoadingOverlay, Popover, TextInput } from '@mantine/core'
import BigLogo from '../General/BigLogo'
import ConnectButton from '../General/ConnectButton'
import SideDrawer from '../SideDrawer'
import classes from './appnav.module.css'
import NotifcationDrawer from '../NotifcationDrawer'
import { useMediaQuery } from '@mantine/hooks'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { modals } from '@mantine/modals'
import { useRef, useState } from 'react'

const SearchBar = () => {
  const [opened, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isCancel, setIsCancel] = useState(false)
  const loadingTimer = useRef<NodeJS.Timeout>()
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const type = searchParams.get('type')

  const clear = () => {
    inputRef.current!.value = ''
    setIsCancel(false)
    setOpen(false)
  }

  const open = () => {
    setOpen(true)
  }

  const close = () => {
    setOpen(false)
  }

  const RightIcon = (
    <Icon
      icon={isCancel ? 'material-symbols-light:close' : 'iconamoon:search-thin'}
      fontSize={24}
      color="white"
      className="shrink-0"
      onClick={clear}
    />
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const searchValue = inputRef.current!.value
    if (searchValue.length >= 3) {
      setOpen(false)
      if (type) {
        navigate(`marketplace?type=${type}&query=${searchValue}`)
      } else {
        navigate(`marketplace?query=${searchValue}`)
      }
    }
  }

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length >= 3) {
      setIsLoading(true)
      setIsCancel(true)
    } else {
      setIsCancel(false)
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    clearTimeout(loadingTimer.current)
    if (e.currentTarget.value.length >= 3) {
      loadingTimer.current = setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    } else {
      setIsLoading(false)
      setIsCancel(false)
    }
  }

  return (
    <Popover width="target" position="bottom-start" radius={16} shadow="md" opened={opened} onChange={close}>
      <Popover.Target>
        <form onSubmit={handleSubmit} className="flex-1 max-w-xl">
          <TextInput
            ref={inputRef}
            onFocus={open}
            onKeyUp={handleKeyUp}
            onInput={handleInput}
            classNames={{ input: classes.searchbar, section: 'w-max px-6 shrink-0' }}
            placeholder="Search music, artists, playlist"
            rightSection={RightIcon}
          />
        </form>
      </Popover.Target>
      <Popover.Dropdown bg="var(--mantine-color-body)" className="overflow-hidden">
        <LoadingOverlay visible={isLoading} zIndex={1} overlayProps={{ radius: 'lg', blur: 2, bg: '#ffffff10' }} />
        <div className="w-full h-[200px] rounded-xl">
          <span>Hello</span>
        </div>
      </Popover.Dropdown>
    </Popover>
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
