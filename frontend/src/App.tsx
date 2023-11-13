import { Route, Routes } from 'react-router-dom'
import { ModalsProvider } from '@mantine/modals'
// import Communities from './Pages/Communities'
import Home from './Pages/Home'
import MarketPlace from './Pages/MarketPlace'
import MusicDetails from './Pages/MusicDetails'
import Profile from './Pages/Profile'
import AppNav from './components/AppNav'
import AppSideBar from './components/AppSideBar'
// import Events from './Pages/Events'
import MyStreams from './Pages/MyStreams'
// import AddEvent from './Pages/AddEvent'
import AlgoProvider from './components/AlgoProvider'
import MessageModal from './components/Modals/MessageModal'
import BuyModal from './components/Modals/BuyModal'
import CreateArtNft from './Pages/CreateArtNft'
import CreateSoundNFt from './Pages/CreateSoundNFT'
import WalletModal from './components/Modals/WalletModal'
import DAO from './Pages/DAO'
import DaoModal from './components/Modals/DaoModal'
import ArtDetails from './Pages/ArtDetails'
// import ProtectedRoute from './Pages/ProtectedRoute'
// jk
export default function App() {
  return (
    <main className="w-full min-h-[100lvh] bg-[#111111] flex">
      <AppSideBar />
      <div className="w-full overflow-hidden">
        <AppNav />
        <AlgoProvider>
          <ModalsProvider modals={{ message: MessageModal, buy: BuyModal, wallet: WalletModal, dao: DaoModal }}>
            <Routes>
              <Route index Component={Home} />
              <Route path="/marketplace" Component={MarketPlace} />
              <Route path="/marketplace/music/:musicId" Component={MusicDetails} />
              <Route path="/marketplace/art/:artId" Component={ArtDetails} />
              {/* <Route path="/communities" Component={Communities} /> */}
              {/* <Route path="/events" Component={Events} /> */}
              {/* <Route path="/events/add" Component={AddEvent} /> */}
              {/* <Route path="/earnings" Component={MyStreams} /> */}
              {/* <Route path="/upload" Component={Upload} /> */}
              <Route path="/dao" Component={DAO} />
              <Route path="/streams" Component={MyStreams} />
              <Route path="/create/art" Component={CreateArtNft} />
              <Route path="/create/sound" Component={CreateSoundNFt} />
              <Route path="/profile" Component={Profile} />
            </Routes>
          </ModalsProvider>
        </AlgoProvider>
      </div>
    </main>
  )
}
