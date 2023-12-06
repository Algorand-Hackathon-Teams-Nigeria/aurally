import { Icon } from '@iconify/react'
import { TextInput } from '@mantine/core'
import { ContextModalProps } from '@mantine/modals'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './search.module.css'

const SearchModal = ({ context, id }: ContextModalProps) => {
  const closeModal = () => {
    context.closeModal(id)
  }
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
      fontSize={20}
      color="white"
      className="shrink-0"
      onClick={clear}
    />
  )

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-16 flex items-center gap-4 bg-white/[0.04] pr-[4%]">
        <div onClick={closeModal} className="grid place-items-center w-12 h-full border-r border-white/[0.075] pointer-events-auto">
          <Icon icon="ep:arrow-up" rotate={3} width={20} />
        </div>
        <TextInput
          value={search}
          onChange={handleChange}
          radius={32}
          classNames={{ ...classes, section: 'w-max px-4 shrink-0' }}
          placeholder="Search music, artists, playlist"
          rightSection={RightIcon}
        />
      </div>
    </>
  )
}

export default SearchModal
