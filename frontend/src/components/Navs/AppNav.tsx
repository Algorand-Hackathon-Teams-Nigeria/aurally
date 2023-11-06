import { useState } from 'react'
import classes from './appnav.module.css'
import { ActionIcon, Burger, Button, TextInput } from '@mantine/core'
import { Icon } from '@iconify/react'
import BigLogo from '../Logos/BigLogo'

const AppNav = () => {
  const [opened, setIsOpened] = useState(false)

  const toggle = () => {
    setIsOpened((prev) => !prev)
  }

  return (
    <header className={`${classes.appNav}`} data-sub-bg={false}>
      <div className="flex items-center lg:hidden">
        <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
        <BigLogo className="w-[103px] ml-2" />
      </div>
      <div className="w-full">
        <TextInput
          size="lg"
          classNames={{ input: classes.searchbar }}
          className="hidden lg:block"
          placeholder="Search music, artists, playlist"
        />
      </div>
      <div className="flex items-center ml-5 lg:ml-14">
        <ActionIcon variant="filled" aria-label="Settings" color="#1E1E1E" radius={'xl'} size={'xl'} mr={8}>
          <Icon icon="carbon:notification" />
        </ActionIcon>
        <div className="lg:hidden">
          <ActionIcon variant="filled" aria-label="Settings" color="purple" radius={'xl'} size={'xl'}>
            <Icon icon="line-md:account" />
          </ActionIcon>
        </div>
        <div className="hidden lg:inline-block">
          <Button variant="filled" size="lg" radius={'xl'}>
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  )
}

export default AppNav
