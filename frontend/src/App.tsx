import { Outlet, Route, Routes } from 'react-router-dom'
import { ModalsProvider } from '@mantine/modals'
import Home from './Pages/Home'
import MarketPlace from './Pages/MarketPlace'
import MusicDetails from './Pages/MusicDetails'
import Profile from './Pages/Profile'
import AppNav from './components/AppNav'
import AppSideBar from './components/AppSideBar'
import MyStreams from './Pages/MyStreams'
import AlgoProvider from './components/AlgoProvider'
import MessageModal from './components/Modals/MessageModal'
import BuyModal from './components/Modals/BuyModal'
import CreateArtNft from './Pages/CreateArtNft'
import CreateSoundNFt from './Pages/CreateSoundNFT'
import WalletModal from './components/Modals/WalletModal'
import DAO from './Pages/DAO'
import DaoModal from './components/Modals/DaoModal'
import ArtDetails from './Pages/ArtDetails'
import ErrorBoundary from './components/ErrorBoundary'
import LandingPage from './Pages/LandingPage'
import CreateProposal from './Pages/CreateProposal'

export default function App() {
  return (
    <Routes>
      <Route index Component={LandingPage} />
      <Route path="/dapp" Component={AppWrapper}>
        <Route index Component={Home} />
        <Route path="marketplace" Component={MarketPlace} />
        <Route path="marketplace/music/:musicId" Component={MusicDetails} />
        <Route path="marketplace/art/:artId" Component={ArtDetails} />
        <Route path="dao" Component={DAO} />
        <Route path="dao/create" Component={CreateProposal} />
        <Route path="streams" Component={MyStreams} />
        <Route path="create/art" Component={CreateArtNft} />
        <Route path="create/sound" Component={CreateSoundNFt} />
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
            <ModalsProvider modals={{ message: MessageModal, buy: BuyModal, wallet: WalletModal, dao: DaoModal }}>
              <Outlet />
            </ModalsProvider>
          </AlgoProvider>
        </ErrorBoundary>
      </div>
    </main>
  )
}
