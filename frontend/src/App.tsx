import { ModalsProvider } from '@mantine/modals'
import { Outlet, Route, Routes } from 'react-router-dom'
import ArtDetails from './Pages/ArtDetails'
import { Communities, CommunitiesIndex } from './Pages/Communities'
import Community from './Pages/Community'
import CreateArtNft from './Pages/CreateArtNft'
import CreateEvent from './Pages/CreateEvent'
import CreateProposal from './Pages/CreateProposal'
import CreateSoundNFt from './Pages/CreateSoundNFT'
import DAO from './Pages/DAO'
import Events from './Pages/Events'
import Home from './Pages/Home'
import LandingPage from './Pages/LandingPage'
import MarketPlace from './Pages/MarketPlace'
import MusicDetails from './Pages/MusicDetails'
import MyNfts from './Pages/MyNfts'
import Profile from './Pages/Profile'
import AlgoProvider from './components/AlgoProvider'
import AppNav from './components/AppNav'
import AppSideBar from './components/AppSideBar'
import ErrorBoundary from './components/ErrorBoundary'
import BuyModal from './components/Modals/BuyModal'
import DaoModal from './components/Modals/DaoModal'
import MessageModal from './components/Modals/MessageModal'
import SearchModal from './components/Modals/SearchModal'
import WalletModal from './components/Modals/WalletModal'
import { ContractDataProvider } from './providers/ContractDataProvider'

export default function App() {
  return (
    <Routes>
      <Route index Component={LandingPage} />
      <Route path="/dapp" Component={AppWrapper}>
        <Route index Component={Home} />
        <Route path="marketplace" Component={MarketPlace} />
        <Route path="marketplace/music" Component={MusicDetails} />
        <Route path="marketplace/art" Component={ArtDetails} />
        <Route path="dao" Component={DAO} />
        <Route path="dao/create" Component={CreateProposal} />
        <Route path="nfts" Component={MyNfts} />
        <Route path="create/art" Component={CreateArtNft} />
        <Route path="create/sound" Component={CreateSoundNFt} />
        <Route path="communities" Component={Communities}>
          <Route index Component={CommunitiesIndex} />
          <Route path=":forumId" Component={Community} />
        </Route>
        <Route path="events" Component={Events} />
        <Route path="events/create" Component={CreateEvent} />
        <Route path="profile" Component={Profile} />
      </Route>
    </Routes>
  )
}

const AppWrapper = () => {
  return (
    <main className="w-full min-h-[100lvh] bg-[#111111] flex">
      <AppSideBar />
      <div className="w-full overflow-hidden">
        <AppNav />
        <ErrorBoundary>
          <AlgoProvider>
            <ContractDataProvider>
              <ModalsProvider modals={{ message: MessageModal, buy: BuyModal, wallet: WalletModal, dao: DaoModal, search: SearchModal }}>
                <Outlet />
              </ModalsProvider>
            </ContractDataProvider>
          </AlgoProvider>
        </ErrorBoundary>
      </div>
    </main>
  )
}
