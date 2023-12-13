import { Icon } from '@iconify/react'
import { Image, LoadingOverlay, Popover, TextInput } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { appClientAtom } from '../../store/contractAtom'
import { ArtType, SoundType } from '../../types/assets'
import { ellipseAddress } from '../../utils/ellipseAddress'
import { parseNftBoxData } from '../../utils/parsing'
import BigLogo from '../General/BigLogo'
import ConnectButton from '../General/ConnectButton'
import NotifcationDrawer from '../NotifcationDrawer'
import SideDrawer from '../SideDrawer'
import classes from './appnav.module.css'

const SearchBar = () => {
  const [opened, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isCancel, setIsCancel] = useState(false)
  const [result, setResult] = useState<(SoundType | ArtType)[]>([])
  const loadingTimer = useRef<NodeJS.Timeout>()
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [appClient] = useAtom(appClientAtom)

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

  const getData = async (): Promise<(SoundType | ArtType)[]> => {
    const boxes = await appClient?.appClient.getBoxValues((name) => name.name.startsWith('Art') || name.name.startsWith('Sound'))
    if (boxes) {
      return parseNftBoxData(boxes)
    }
    return []
  }

  const { data } = useQuery({
    queryKey: ['nfts'],
    queryFn: getData,
    enabled: !!appClient,
  })

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
        const filteredNft = data?.filter((item) => {
          const loweredQ = inputRef.current!.value.toLowerCase() || ''
          const loweredTitle = item.data.title.toLowerCase()
          const loweredOwner = item.data.owner.toLowerCase()
          return loweredOwner.includes(loweredQ) || loweredTitle.includes(loweredQ)
        })
        setResult(filteredNft ?? [])
      }, 1000)
    } else {
      setIsLoading(false)
      setIsCancel(false)
    }
  }

  const onSuggestionClicked = (item: SoundType | ArtType) => {
    clear()
    navigate(`/dapp/marketplace/${item.type === 'art' ? 'art' : 'music'}?assetKey=${item.data.asset_key}`)
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
            placeholder="Search by title and address"
            rightSection={RightIcon}
          />
        </form>
      </Popover.Target>
      <Popover.Dropdown bg="var(--mantine-color-body)" className="overflow-hidden">
        <LoadingOverlay visible={isLoading} zIndex={1} overlayProps={{ radius: 'lg', blur: 2, bg: '#ffffff10' }} />
        <div className="w-full h-[200px] overflow-y-scroll rounded-xl space-y-3">
          {result?.map((item) => (
            <div
              onClick={() => onSuggestionClicked(item)}
              key={Number(item.data.asset_id)}
              className="flex items-center justify-between gap-3 border border-borderColor sm:rounded-lg p-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md overflow-hidden shrink-0">
                  <Image
                    src={item.type === 'art' ? item.data.ipfs_location : item.data.cover_image_ipfs}
                    className="object-top object-cover h-full"
                  />
                </div>
                <div className="space-y-0.5">
                  <div className="font-bold text-sm">{item.data?.title}</div>
                  <span className="text-[#afafaf] text-[10px]  mx-[0.25em]">By: {ellipseAddress(item.data.owner)}</span>
                </div>
              </div>
              <Icon icon="heroicons-outline:external-link" fontSize={20} />
            </div>
          ))}
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
