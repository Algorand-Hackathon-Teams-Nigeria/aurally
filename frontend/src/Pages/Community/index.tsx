import { ActionIcon, Image, Textarea } from '@mantine/core'
import classes from './community.module.css'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Header = () => {
  return (
    <div className="w-full bg-[#444] px-4 md:px-6 h-16 md:h-20 z-50 md:z-[1] fixed md:absolute top-0 right-0 flex items-center gap-4">
      <ActionIcon to={'/dapp/communities'} component={Link} classNames={{ root: classes.arrowBack }}>
        <Icon icon="typcn:arrow-back-outline" width={20} stroke="1.5px" />
      </ActionIcon>
      <div className="h-10 w-10 rounded-sm overflow-hidden bg-[#444] hidden lg:block">
        <Image
          width={40}
          h={40}
          radius={2}
          fit="cover"
          loading="lazy"
          src="https://gateway.pinata.cloud/ipfs/QmTaf7kEg9hNi3msa8GryvMLBHZVDCv34KMzmhN7sP99qu"
          alt=""
        />
      </div>
      <div>
        <div>Alte All Through</div>
        <div className="flex items-center text-[12px] mt-1">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="leading-none ml-[0.5em]">Active</span>
        </div>
      </div>
    </div>
  )
}

const Bottom = () => {
  return (
    <div className="w-full h-max min-h-20 bg-[#444] flex justify-between gap-3 p-4 pr-3 lg:mb-2 fixed md:absolute bottom-0 right-0">
      <Textarea
        autosize
        rows={0}
        maxRows={5}
        size="md"
        placeholder="Say Something..."
        classNames={{ root: classes.input_root, input: classes.input }}
      />
      <ActionIcon classNames={{ root: classes.send }}>
        <Icon icon="ant-design:send-outlined" />
      </ActionIcon>
    </div>
  )
}

const Community = () => {
  useEffect(() => {
    if (innerWidth < 1024) {
      document.body.style.overflow = 'hidden'
      // document.body.style.height = `${innerHeight}px`
    }
    return () => {
      document.body.style.overflow = ''
      // document.body.style.maxHeight = ``
    }
  }, [])

  return (
    <div className="flex-1 shrink lg:shrink-0 w-full md:w-[calc(100vw-90px)] min-w-0 lg:min-w-[500px] lg:min-h-[40px] h-full fixed lg:sticky top-0 right-0 flex flex-col bg-[#111]">
      <Header />
      <div className="flex-1 h-full px-[4.5%] min-[375px]:px-5 lg:px-8"></div>
      <Bottom />
    </div>
  )
}

export default Community
