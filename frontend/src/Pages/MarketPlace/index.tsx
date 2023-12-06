import MusicCard, { MusicCardLoader } from '../../components/MusicCard'
import { useAtomValue } from 'jotai'
import { nftListAtom } from '../../store/atoms'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Checkbox, Group, Menu, NumberInput } from '@mantine/core'
import { Icon } from '@iconify/react'
import inputClasses from '../../styles/textinput.module.css'
import { useState } from 'react'

const MarketPlace = () => {
  const nftList = useAtomValue(nftListAtom)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // params from url
  const type = searchParams.get('type')
  const query = searchParams.get('query')

  const [value, setValue] = useState<string[]>(type ? [type] : [])

  const [opened, setOpened] = useState(false)
  const toggle = () => setOpened((o) => !o)

  // filtering by type
  const filterList = (type: string | null) => {
    const list = nftList.filter((item) => {
      if (!type) return true
      if (type === item.type) return true
      return false
    })
    return list
  }

  const getNftData = async (type: string | null): Promise<typeof nftList> => {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(filterList(type))
        } catch (error) {
          reject(error)
        }
      }, 2000)
    })
  }

  const { data, isLoading } = useQuery({
    queryKey: ['marketplace', type],
    queryFn: () => getNftData(type),
  })

  const applyChanges = () => {
    toggle()
    navigate(`/dapp/marketplace?${value.length === 1 ? `type=${value[0]}` : ''}`)
  }

  return (
    <div className="space-y-8 mb-32 routePage">
      <div>
        <div className="flex justify-end">
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
        <div className="grid grid-cols-music-card gap-3">
          {isLoading
            ? [1, 2, 3, 4].map((item) => <MusicCardLoader key={item} />)
            : data?.map((item) => (
                <MusicCard
                  img={item.imgUrl}
                  title={item.title}
                  title2="Bid"
                  title3={item.type === 'art' ? item.creator : item.artist}
                  title4={`${Number(item.price)} ALGO`}
                  key={item.id}
                  buttonLabel={item.type === 'sound' ? 'Stream and Buy' : 'Buy'}
                  link={`/dapp/marketplace/${item.type === 'sound' ? 'music' : 'art'}/${item.id}`}
                />
              ))}
        </div>
        {nftList.length === 0 && (
          <div className="w-full py-28  flex justify-center items-center text-center text-[#8A2BE2] font-bold">No NFTs found</div>
        )}
      </div>
    </div>
  )
}

export default MarketPlace
