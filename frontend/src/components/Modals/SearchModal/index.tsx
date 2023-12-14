import { Icon } from '@iconify/react'
import { Image, TextInput } from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import classes from './search.module.css'
import { useQuery } from '@tanstack/react-query'
import { parseNftBoxData } from '../../../utils/parsing'
import { ArtType, SoundType } from '../../../types/assets'
import { createAppClient } from '../../../utils/network/contract-config'
import { ellipseAddress } from '../../../utils/ellipseAddress'

const SearchModal = ({ context, id }: ContextModalProps) => {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const type = searchParams.get('type')

  const closeModal = () => {
    context.closeModal(id)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
  }

  const clear = () => {
    setSearch('')
  }

  const RightIcon = <Icon icon={'material-symbols-light:close'} fontSize={20} color="white" className="shrink-0" onClick={clear} />

  const getData = async (): Promise<(SoundType | ArtType)[]> => {
    const boxes = await createAppClient()?.appClient.getBoxValues((name) => name.name.startsWith('Art') || name.name.startsWith('Sound'))
    if (boxes) {
      return parseNftBoxData(boxes)
    }
    return []
  }

  const { data } = useQuery({
    queryKey: ['nfts'],
    queryFn: getData,
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (search.length >= 3) {
      if (type) {
        navigate(`marketplace?type=${type}&query=${search}`)
      } else {
        navigate(`marketplace?query=${search}`)
      }
      closeModal()
    }
  }

  const onSuggestionClicked = (item: SoundType | ArtType) => {
    clear()
    closeModal()
    navigate(`/dapp/marketplace/${item.type === 'art' ? 'art' : 'music'}?assetKey=${item.data.asset_key}`)
  }

  const filteredNft =
    data?.filter((item) => {
      const loweredQ = search.toLowerCase() || ''
      const loweredTitle = item.data.title.toLowerCase()
      const loweredOwner = item.data.owner.toLowerCase()
      return loweredOwner.includes(loweredQ) || loweredTitle.includes(loweredQ)
    }) || []

  return (
    <>
      <form onSubmit={handleSubmit} className="fixed top-0 left-0 w-full h-16 flex items-center gap-4 bg-white/[0.04] pr-[4%]">
        <Icon icon="ep:arrow-up" rotate={3} width={20} className="ml-4 shrink-0" />
        <TextInput
          value={search}
          onChange={handleChange}
          radius={32}
          classNames={{ ...classes, section: 'w-max px-4 shrink-0' }}
          placeholder="Search music, artists, playlist"
          rightSection={!!search && RightIcon}
        />
      </form>
      <div className="w-full space-y-3 pt-20">
        {search ? (
          filteredNft.length > 0 ? (
            filteredNft?.map((item) => (
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
            ))
          ) : (
            <div className="flex flex-col items-center">
              <div>
                No Result for <span className="italic text-primary">"{search}"</span>
              </div>
            </div>
          )
        ) : null}
      </div>
    </>
  )
}

export default SearchModal
