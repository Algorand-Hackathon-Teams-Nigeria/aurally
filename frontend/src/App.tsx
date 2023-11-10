import { Route, Routes } from 'react-router-dom'
// import Communities from './Pages/Communities'
import Home from './Pages/Home'
import MarketPlace from './Pages/MarketPlace'
import MusicDetails from './Pages/MusicDetails'
import Profile from './Pages/Profile'
import AppNav from './components/AppNav'
import AppSideBar from './components/AppSideBar'
// import Events from './Pages/Events'
import Assets from './Pages/Assets'
// import AddEvent from './Pages/AddEvent'
import Upload from './Pages/Upload'
import AlgoProvider from './components/AlgoProvider'
import WalletModal from './components/WalletModal'
import { ModalsProvider } from '@mantine/modals'
import MessageModal from './components/Modals/MessageModal'
import BuyModal from './components/Modals/BuyModal'
import CreateNft from './Pages/CreateNft'
// import ProtectedRoute from './Pages/ProtectedRoute'

export default function App() {
  return (
    <main className="w-full min-h-[100lvh] bg-[#111111] flex">
      <AppSideBar />
      <div className="w-full overflow-hidden">
        <AppNav />
        <ModalsProvider modals={{ message: MessageModal, buy: BuyModal }}>
          <Routes>
            <Route index Component={Home} />
            <Route path="/marketplace" Component={MarketPlace} />
            <Route path="/marketplace/music/:musicId" Component={MusicDetails} />
            {/* <Route path="/communities" Component={Communities} /> */}
            {/* <Route path="/events" Component={Events} /> */}
            {/* <Route path="/events/add" Component={AddEvent} /> */}
            <Route path="/earnings" Component={Assets} />
            <Route path="/upload" Component={Upload} />
            <Route path="/create" Component={CreateNft} />
            <Route path="/profile" Component={Profile} />
          </Routes>
        </ModalsProvider>
        <AlgoProvider>
          <WalletModal />
        </AlgoProvider>
      </div>
    </main>
  )
}
