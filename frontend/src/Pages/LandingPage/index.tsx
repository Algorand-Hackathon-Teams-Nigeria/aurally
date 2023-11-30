import hero from './component/hero.svg'
import algorand from './component/Algorand.png'
import ashinity from './component/ashinity.svg'
import SideBar from './component/SideBar'
import { Image } from '@mantine/core'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import BigLogo from '../../components/General/BigLogo'
import classes from './landing.module.css'
import SvgOne from './component/SvgOne'
import forum from './component/chat-circle.svg'
import HomeMarketPlace from './component/HomeMarketPlace'

const features = [
  {
    title: 'Streaming',
    icon: 'ph:play-thin',
    desc: 'Start by seamlessly connecting your digital wallet to the platform. Our application supports various blockchain networks, ensuring compatibility with popular cryptocurrencies. Your wallet is your secure gateway to the world of NFTs.',
  },
  {
    title: 'Earn Reward',
    icon: 'ph:gift-thin',
    desc: 'Start by seamlessly connecting your digital wallet to the platform. Our application supports various blockchain networks, ensuring compatibility with popular cryptocurrencies. Your wallet is your secure gateway to the world of NFTs.',
  },
  {
    title: 'Voting',
    icon: 'material-symbols-light:chess-outline',
    desc: "Embrace a new era of decision-making where every participant has a voice. Our DAO governance model ensures that major decisions about the platform's development, policies, and future directions are collectively made by the community.",
  },
  {
    title: 'Forum Discussion',
    icon: 'mdi-light:forum',
    desc: 'Start by seamlessly connecting your digital wallet to the platform. Our application supports various blockchain networks, ensuring compatibility with popular cryptocurrencies. Your wallet is your secure gateway to the world of NFTs.',
  },
]

const works = [
  {
    title: 'Connect your wallet',
    icon: 'ph:wallet-thin',
    desc: 'Start by seamlessly connecting your digital wallet to the platform. Our application supports various blockchain networks, ensuring compatibility with popular cryptocurrencies. Your wallet is your secure gateway to the world of NFTs.',
  },
  {
    title: 'Browse marketplace',
    icon: 'iconamoon:search-thin',
    desc: 'Explore a dynamic marketplace filled with unique digital assets. From stunning artworks to exclusive collectibles, our curated marketplace showcases a diverse range of NFTs. Discover new releases, trending items, and hidden gems.',
  },
  {
    title: 'Purchase Art/Music',
    icon: 'ph:wallet-thin',
    desc: "Once you've found the perfect NFT, collecting is a breeze. Make it yours with a simple click. . Immerse yourself in the world of digital creativity like never before.",
  },
  {
    title: 'Start streaming',
    icon: 'ph:play-thin',
    desc: 'But we go beyond just ownership - our platform allows you to seamlessly stream digital content associated with your NFTs',
  },
]

const roadmaps = [
  {
    title: 'At Each 1000 Mints Nov 2023',
    desc: 'Willy Wang sweeps the floor on NFTworld to clear any NFTs below minting price (this is to make sure your NFT retains its value throughout the minting process)',
  },
  {
    title: 'At Each 1000 Mints Nov 2023',
    desc: 'Willy Wang sweeps the floor on NFTworld to clear any NFTs below minting price (this is to make sure your NFT retains its value throughout the minting process)',
  },
  {
    title: 'At Each 1000 Mints Nov 2023',
    desc: 'Willy Wang sweeps the floor on NFTworld to clear any NFTs below minting price (this is to make sure your NFT retains its value throughout the minting process)',
  },
  {
    title: 'At Each 1000 Mints Nov 2023',
    desc: 'Willy Wang sweeps the floor on NFTworld to clear any NFTs below minting price (this is to make sure your NFT retains its value throughout the minting process)',
  },
  {
    title: 'At Each 1000 Mints Nov 2023',
    desc: 'Willy Wang sweeps the floor on NFTworld to clear any NFTs below minting price (this is to make sure your NFT retains its value throughout the minting process)',
  },
]

export default function Home() {
  return (
    <main className={`${classes.landing} max-h-screen font-space overflow-y-auto px-[4.5%] bg-pageGrad`}>
      <div className="max-w-6xl mx-auto">
        {/* NavBar */}
        <nav className="pt-6 pb-3 flex justify-between items-center">
          <BigLogo to="/" className="w-28 lg:w-max" />
          <div className="hidden lg:flex gap-14">
            <Link to="/">Home</Link>
            <a href="#features">Features</a>
            <a href="#works">How it works</a>
            <a href="#road">Roadmap</a>
          </div>
          <SideBar />
          <Link to="/dapp" className={`${classes.getBtn} hidden lg:flex`}>
            Launch App
          </Link>
        </nav>
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-20 sm:mt-24 gap-14">
          <div className="max-w-[568px] flex-[1.5] lg:flex-[1.2]">
            <h1 className="text-4xl lg:text-5xl xl:text-[4rem] font-bold">
              Discover, <span className={classes.txt_grd}>Stream</span> and collect the <span className={classes.txt_grd}>Rarest Nfts</span>
            </h1>
            <div className="text-sm min-[420px]:text-base md:text-lg xl:text-xl mt-7">
              The Largest NFTs Marketplace. Automatic and truly unique digital creation. Signed and issued by the creator, made possible by
              Algorand blockchain technology
            </div>
            <Link to="/dapp" className={`${classes.getBtn} flex max-w-[163px] mt-12`}>
              Get Started
            </Link>
          </div>
          <div className="flex-1 max-w-[440px] flex justify-end">
            <Image className="object-contain min-w-full" src={hero} alt="hero" />
          </div>
        </div>
        {/* Partner */}
        <div className="overflow-x-auto mt-32 mb-40" id="partners">
          <div className="mx-auto w-max flex justify-center gap-16">
            <div className="flex items-center gap-4">
              <Image src={algorand} alt="partner" />
              <div className="text-3xl font-bold">Algorand</div>
            </div>
            <Image src={ashinity} className=" scale-75" alt="partner" />
          </div>
        </div>
        {/* Features */}
        <div className="rounded-[20px] bg-[#111] border border-primary px-[5%] sm:px-9 py-12 sm:py-16 mb-28" id="features">
          <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold">Features</h2>
          <div className="grid md:grid-cols-2 mt-8 sm:mt-14">
            {features.map(({ title, icon, desc }, index) => (
              <div
                key={index}
                className=" md:odd:border-r border-primary pb-12 md:odd:pr-6 md:even:pl-4 lg:odd:pr-16 lg:even:pl-16 flex gap-4 items-center sm:items-start"
              >
                {index === 3 ? (
                  <Image src={forum} className="max-w-[11.5vw] sm:max-w-[5rem] lg:max-w-[6.2rem] h-max" />
                ) : (
                  <Icon icon={icon} className="text-[12.5vw] sm:text-[5rem] lg:text-[6.5rem] text-primary shrink-0" />
                )}
                <div>
                  <div className="text-lg md:text-xl lg:text-2xl mb-7 font-bold">{title}</div>
                  <div className="text-xs md:text-sm leading-normal">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* MarketPlace */}
        <HomeMarketPlace />
        {/* How it Works */}
        <div className="flex flex-col items-center my-36" id="works">
          <h2 className="text-center text-3xl md:text-4xl lg:text-5xl xl:text-[4rem] font-bold">How it works</h2>
          <div className="text-center sm:text-lg md:text-xl max-w-[934px] mt-6 mb-14">
            Immerse yourself in the world of digital creativity like never before. Here is a step our how our platform works
          </div>
          <div className="grid md:grid-cols-2 mt-8 gap-12 lg:gap-16">
            {works.map(({ title, icon, desc }, index) => (
              <div key={index} className="flex sm:gap-2 lg:gap-4">
                <SvgOne num={index + 1} />
                <div className="flex-1 rounded-[10px] border border-primary py-6 px-4">
                  <Icon icon={icon} className="text-[4rem] text-primary" />
                  <div className="text-lg md:text-xl lg:text-2xl mt-4 mb-7">{title}</div>
                  <div className="text-xs md:text-sm leading-normal">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Roadmap */}
        <div className="mb-36" id="road">
          <h2 className="text-center text-3xl md:text-4xl lg:text-5xl xl:text-[4rem] font-bold mb-10">Roadmap</h2>
          <div className="hidden md:block">
            <div className="grid grid-cols-roadmap items-center">
              <div className="pt-14" />
              <div className="h-full bg-primary relative roadmap-top" />
            </div>
            {roadmaps.map(({ title, desc }, index) => (
              <div key={index} className="grid grid-cols-roadmap items-center">
                {index % 2 !== 0 && (
                  <>
                    <div />
                    <div className="h-full bg-primary relative" />
                  </>
                )}
                <div>
                  <div className={`flex gap-5 ${index % 2 !== 0 ? 'justify-start' : 'justify-end'}`}>
                    {index % 2 !== 0 && <div className="arrow-right" />}
                    <div className="flex items-center">
                      {index % 2 === 0 && (
                        <div className="bg-primary w-10 h-10 lg:w-12 lg:h-12 rounded-l-full grid place-items-center shrink-0">
                          <span className=" text-2xl lg:text-3xl font-bold -mr-1">{index + 1}</span>
                        </div>
                      )}
                      <div className="border border-borderColor p-4 rounded-[10px] max-w-[420px]">
                        <div className="font-bold mb-4">{title}</div>
                        <div>{desc}</div>
                      </div>
                      {index % 2 !== 0 && (
                        <div className="bg-primary w-10 h-10 lg:w-12 lg:h-12 rounded-r-full grid place-items-center shrink-0">
                          <span className=" text-2xl lg:text-3xl font-bold -ml-1">{index + 1}</span>
                        </div>
                      )}
                    </div>
                    {index % 2 === 0 && <div className="arrow-left" />}
                  </div>
                </div>
                {index % 2 === 0 && (
                  <>
                    <div className="h-full bg-primary relative" />
                    <div />
                  </>
                )}
              </div>
            ))}
            <div className="grid grid-cols-roadmap items-center">
              <div className="pb-14" />
              <div className="h-full bg-primary relative roadmap-bottom" />
            </div>
          </div>
          <div className="w-full grid md:hidden grid-cols-roadmap-sm items-center pt-12">
            <div className="h-[calc(100%+80px)] bg-primary roadmap relative" />
            <div className="w-full space-y-8">
              {roadmaps.map(({ title, desc }, index) => (
                <div key={index} className="flex gap-3 justify-start">
                  <div className="bg-primary h-7 w-7 sm:w-8 sm:h-8 lg:w-12 lg:h-12 rounded-r-full grid place-items-center shrink-0">
                    <span className=" sm:text-xl lg:text-3xl font-bold -ml-1">{index + 1}</span>
                  </div>
                  <div className="border border-borderColor p-4 rounded-[10px] max-w-[420px]">
                    <div className="font-bold mb-4">{title}</div>
                    <div>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* community */}
        <div className="bg-primary rounded-3xl py-[70px] px-4 overflow-hidden relative">
          <div className=" absolute -top-20 -left-20 h-56 w-56 rounded-full bg-[#6500764D]" />
          <div className=" absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#6500764D]" />
          <div className=" relative">
            <div className="text-[28px] sm:text-4xl lg:text-5xl font-bold text-center mb-9">Joint Our Community</div>
            <Link to="/dapp" className="w-max block px-8 py-4 rounded-[40px] bg-white text-[#1C51FE] mx-auto">
              Get Started
            </Link>
          </div>
          <div />
        </div>
        {/* Footer */}
        <div className="mt-32">
          <div className="w-max mx-auto mb-12">
            <BigLogo to="#" />
            <div className="flex gap-5 mt-10">
              <div className="h-10 w-10 rounded-[10px] bg-[#3434444D] grid place-items-center">
                <Icon icon="ic:round-facebook" color="white" fontSize={22} />
              </div>
              <div className="h-10 w-10 rounded-[10px] bg-[#3434444D] grid place-items-center">
                <Icon icon="mdi:twitter" color="white" fontSize={22} />
              </div>
              <div className="h-10 w-10 rounded-[10px] bg-[#3434444D] grid place-items-center">
                <Icon icon="ic:baseline-discord" color="white" fontSize={22} />
              </div>
            </div>
          </div>
          <div className="h-[0.5px] w-full bg-[#8A8AA0] mb-5" />
          <div className="flex flex-col sm:flex-row gap-5 items-center justify-between mb-16 sm:mb-28">
            <div>© 2023 Aurally All rights reserved</div>
            <div>Terms & Conditions</div>
          </div>
        </div>
      </div>
    </main>
  )
}
