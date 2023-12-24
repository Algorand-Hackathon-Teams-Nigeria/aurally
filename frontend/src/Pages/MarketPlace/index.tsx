import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Checkbox, Group, Menu, NumberInput } from '@mantine/core'
import { Icon } from '@iconify/react'
import inputClasses from '../../styles/textinput.module.css'
import { useState } from 'react'
import NftCard, { NftCardLoader } from '../../components/Cards/NftCard'
import { parseNftBoxData } from '../../utils/parsing'
import { ArtType, SoundType } from '../../types/assets'
import { createAppClient } from '../../utils/network/contract-config'

const MarketPlace = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // params from url
  const type = searchParams.get('type')
  const query = searchParams.get('query')

  const [value, setValue] = useState<string[]>(type ? [type] : [])

  const [opened, setOpened] = useState(false)
  const toggle = () => setOpened((o) => !o)

  const getData = async (): Promise<(SoundType | ArtType)[]> => {
    const boxes = await createAppClient()?.appClient.getBoxValues((name) => name.name.startsWith('Art') || name.name.startsWith('Sound'))
    if (boxes) {
      return parseNftBoxData(boxes)
    }
    return []
  }

  const { data, isLoading } = useQuery({
    queryKey: ['nfts'],
    queryFn: getData,
  })

  const filteredNft = data?.filter((item) => {
    const loweredQ = query?.toLowerCase() || ''
    const loweredTitle = item.data.title.toLowerCase()
    const loweredOwner = item.data.owner.toLowerCase()
    const typeBool = !type ? true : item.type === type
    return (loweredOwner.includes(loweredQ) || loweredTitle.includes(loweredQ)) && typeBool
  })

  const applyChanges = () => {
    toggle()
    gotoType()
  }

  const gotoType = () => {
    navigate(`/dapp/marketplace?${value.length === 1 ? `type=${value[0]}` : ''}`)
  }

  return (
    <div className="space-y-8 mb-32 routePage">
      <div>
        <div className={`flex items-center justify-end`}>
          <Menu shadow="md" width={400} position="bottom-end" opened={opened} onChange={setOpened}>
            <Menu.Target>
              <Button
                onClick={toggle}
                mb={20}
                bg={'rgba(255,255,255,0.04)'}
                size="md"
                radius={8}
                rightSection={<Icon icon="octicon:filter-24" />}
              >
                Filter
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <div className="py-5 px-2">
                <Checkbox.Group mb={20} label="Filter by Type" value={value} onChange={setValue}>
                  <Group mt="xs">
                    <Checkbox classNames={{ input: inputClasses.checkbox_input }} value="art" label="Art" />
                    <Checkbox classNames={{ input: inputClasses.checkbox_input }} value="sound" label="Sound" />
                  </Group>
                </Checkbox.Group>
                <NumberInput classNames={inputClasses} label="Price" placeholder="0.00 ALGO" min={0} />
                <Button onClick={applyChanges} bg={'rgba(255,255,255,0.04)'} size="md" radius={8} fullWidth className="mt-5">
                  Apply Changes
                </Button>
              </div>
            </Menu.Dropdown>
          </Menu>
        </div>
        {query && (
          <div className="headTag flex items-center gap-2 flex-1 max-w-max">
            <span>{query}</span>
            <Icon icon={'material-symbols-light:close'} fontSize={24} color="white" className="shrink-0" onClick={gotoType} />
          </div>
        )}
        <div className="grid grid-cols-music-card gap-3 sm:gap-4">
          {isLoading
            ? [1, 2, 3, 4].map((item) => <NftCardLoader key={item} />)
            : filteredNft?.map((item) => <NftCard key={Number(item.data.asset_id)} data={item} />)}
        </div>
        {filteredNft?.length === 0 && (
          <div className="w-full py-28  flex justify-center items-center text-center text-[#8A2BE2] font-bold">No NFTs found</div>
        )}
      </div>
    </div>
  )
}

export default MarketPlace
