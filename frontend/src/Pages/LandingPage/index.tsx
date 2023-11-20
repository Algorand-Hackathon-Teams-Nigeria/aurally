import { Play, Search, Wallet } from './component'
import hero from './component/hero.svg'
import live from './component/live.svg'
import voting from './component/voting.png'
import algorand from './component/Algorand.png'
import ashinity from './component/ashinity.svg'
import twitter from './component/twitter.png'
import discord from './component/discord.png'
import facebook from './component/facebook.png'
import SideBar from './component/SideBar'
import { Image } from '@mantine/core'
import { Link } from 'react-router-dom'
import BigLogo from '../../components/General/BigLogo'

const NavBar = () => {
  return (
    <nav className="pt-6 pb-3 w-[91vw] max-w-6xl mx-auto flex justify-between items-center">
      <BigLogo to="/" className="scale-75 lg:scale-100" />
      <div className="hidden lg:flex gap-14">
        <a href="/">Home</a>
        <a href="#works">How it works</a>
        <a href="#road">Roadmap</a>
        <a href="#partners">Partners</a>
      </div>
      <SideBar />
      <Link to="/dapp" className="px-6 h-14 bg-primary rounded-lg hidden place-items-center lg:grid">
        Launch App
      </Link>
    </nav>
  )
}

const HeroSection = () => {
  return (
    <div className="w-[91vw] max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between mt-24 gap-14">
      <div className="max-w-[568px] flex-[1.5] lg:flex-[1.2]">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-[56px] font-bold leading-[1.2] max-w-[534px]">
          Discover and collect the rarest NFTs
        </h1>
        <div className="flex gap-3 lg:gap-5 xl:gap-7 mt-8 md:mt-12 mb-10 md:mb-14">
          <div className="bg-primary rounded-full w-16 h-16 lg:w-20 lg:h-20 xl:w-[120px] xl:h-[120px]  place-items-center px-2 shrink-0 text-xs lg:text-sm xl:text-base text-center hidden min-[820px]:grid">
            Discover NFT
          </div>
          <div className="text-sm min-[420px]:text-base md:text-lg xl:text-xl">
            The Larges NFT Marketplace. Automatic and truly unique digital creation. Signed and issued by the creator, made possible by
            Algorand blockchain technology
          </div>
        </div>
        <div className="flex gap-7">
          <div>
            <div className="font-normal text-sm md:text-base">Artwork</div>
            <div className="text-lg md:text-2xl font-bold">25.1k</div>
          </div>
          <div>
            <div className="font-normal text-sm md:text-base">Artist</div>
            <div className="text-lg md:text-2xl font-bold">15.6k</div>
          </div>
          <div>
            <div className="font-normal text-sm md:text-base">Aucition</div>
            <div className="text-lg md:text-2xl font-bold">10.2k</div>
          </div>
        </div>
      </div>
      <div className="flex-1 max-w-[440px] flex justify-end">
        <Image className="object-contain w-full" src={hero} alt="hero" />
      </div>
    </div>
  )
}

const works = [
  {
    num: 1,
    title: 'Connect your wallet',
    Icon: Wallet,
    desc: 'Start by seamlessly connecting your digital wallet to the platform. Our application supports various blockchain networks, ensuring compatibility with popular cryptocurrencies. Your wallet is your secure gateway to the world of NFTs.',
  },
  {
    num: 2,
    title: 'Browse marketplace',
    Icon: Search,
    desc: 'Explore a dynamic marketplace filled with unique digital assets. From stunning artworks to exclusive collectibles, our curated marketplace showcases a diverse range of NFTs. Discover new releases, trending items, and hidden gems.',
  },
  {
    num: 3,
    title: 'Collect & stream',
    Icon: Play,
    desc: "Once you've found the perfect NFT, collecting is a breeze. Make it yours with a simple click. But we go beyond just ownership - our platform allows you to seamlessly stream digital content associated with your NFTs. Immerse yourself in the world of digital creativity like never before.",
  },
]

const HowItWorks = () => {
  return (
    <div className="w-[91vw] max-w-6xl mx-auto" id="works">
      <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-10">How it works</h2>
      <div className="flex flex-wrap justify-center mt-8 gap-8">
        {works.map(({ title, Icon, desc, num }) => (
          <div key={num} className="min-w-[300px] flex-1 rounded-[10px] border border-borderColor py-6 px-4">
            <div className="text-lg md:text-xl lg:text-2xl">
              <span className="mr-[1em]">{num}.</span>
              {title}
            </div>
            <Icon className="my-9 scale-[0.6] md:scale-100" />
            <div className="text-xs md:text-sm leading-normal">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const Governance = () => {
  return (
    <div className="mt-28 mb-36 w-[91vw] max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 lg:gap-20">
      <div className="flex-1 max-w-[538px]">
        <div className="text-3xl md:text-4xl lg:text-5xl xl:text-[56px] font-bold leading-[1.2] text-center md:text-start">
          DAO Governance
        </div>
        <div className=" lg:text-xl mt-10 lg:mt-16 text-center md:text-start leading-[1.6]">
          Embrace a new era of decision-making where every participant has a voice. Our DAO governance model ensures that major decisions
          about the platform's development, policies, and future directions are collectively made by the community.
        </div>
      </div>
      <Image className="flex-1 object-contain max-w-[500px]" src={voting} alt="hero" />
    </div>
  )
}

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
    <main className="min-h-screen font-space overflow-x-hidden bg-[#111]">
      <div className=" absolute inset-0 bg-pageGrad" />
      <div className="relative">
        <NavBar />
        <HeroSection />
      </div>
      <Image src={live} className="w-full relative my-10" alt="live" />
      <HowItWorks />
      <Governance />
      <div className="relative w-full px-[4.5%] max-w-6xl mb-36 mx-auto" id="road">
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-10">Roadmap</h2>
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
      <div className="w-[91vw] max-w-6xl mx-auto mb-32" id="partners">
        <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-10">Partners</h2>
        <div className="overflow-x-scroll">
          <div className="mx-auto w-max flex justify-center gap-20">
            <div className="flex items-center gap-4">
              <Image src={algorand} alt="partner" />
              <div className="text-3xl font-bold">Algorand</div>
            </div>
            <Image src={ashinity} className=" scale-75" alt="partner" />
          </div>
        </div>
      </div>
      <div className="bg-primary w-[91vw] max-w-7xl mx-auto rounded-[32px] py-[70px] px-4 overflow-hidden relative">
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
      <div className="w-[91vw] mx-auto mt-32">
        <div className="w-max mx-auto mb-12">
          <BigLogo to="#" />
          <div className="flex gap-4 mt-10">
            <Image src={facebook} alt="facebook" />
            <Image src={twitter} alt="twitter" />
            <Image src={discord} alt="discord" />
          </div>
        </div>
        <div className="h-[0.5px] w-full bg-[#8A8AA0] mb-5" />
        <div className="flex flex-col sm:flex-row gap-5 items-center justify-between mb-16 sm:mb-28">
          <div>© 2023 Aurally All rights reserved</div>
          <div>Terms & Conditions</div>
        </div>
      </div>
    </main>
  )
}
