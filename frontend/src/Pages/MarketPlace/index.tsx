import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Checkbox, Group, Menu, NumberInput } from '@mantine/core'
import { Icon } from '@iconify/react'
import inputClasses from '../../styles/textinput.module.css'
import { useState } from 'react'
import NftCard, { NftCardLoader } from '../../components/Cards/NftCard'
import { useAtom } from 'jotai'
import { appClientAtom } from '../../store/contractAtom'
import { parseNftBoxData } from '../../utils/parsing'
import { ArtType, BoxData, SoundType } from '../../types/assets'

const MarketPlace = () => {
  const [appClient,] = useAtom(appClientAtom);
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // params from url
  const type = searchParams.get('type')

  const [value, setValue] = useState<string[]>(type ? [type] : [])

  const [opened, setOpened] = useState(false)
  const toggle = () => setOpened((o) => !o)

  // filtering by type
  const filterList = async (type: string | null) => {
    let nftBoxes: BoxData[] | undefined
    if (type) {
      nftBoxes = await appClient?.appClient.getBoxValues(name => name.name.startsWith(type))
    } else {
      nftBoxes = await appClient?.appClient.getBoxValues(name => name.name.startsWith("Art") || name.name.startsWith("Sound"))
    }
    if (nftBoxes) {
      return parseNftBoxData(nftBoxes)
    }
    return []
  }

  const getNftData = async (type: string | null): Promise<(SoundType | ArtType)[]> => {
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
                    <Checkbox classNames={{ input: inputClasses.checkbox_input }} value="Art" label="Art" />
                    <Checkbox classNames={{ input: inputClasses.checkbox_input }} value="Sound" label="Sound" />
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
        <div className="grid grid-cols-music-card gap-3 sm:gap-4">
          {isLoading
            ? [1, 2, 3, 4].map((item) => <NftCardLoader key={item} />)
            : data?.map((item) => <NftCard key={Number(item.data.asset_id)} data={item} />)}
        </div>
        {data?.length === 0 && (
          <div className="w-full py-28  flex justify-center items-center text-center text-[#8A2BE2] font-bold">No NFTs found</div>
        )}
      </div>
    </div>
  )
}

export default MarketPlace
