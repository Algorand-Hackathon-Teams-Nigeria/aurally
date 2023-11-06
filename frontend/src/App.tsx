import { Route, Routes } from 'react-router-dom'
import AlgokitDefault from './Pages/AlgokitDefault'
import Hello from './Pages/Hello'
import AppNav from './components/Navs/AppNav'
import AppSideBar from './components/Navs/AppSideBar'
import AlgoWrapper from './components/Wrappers/AlgoWrapper'

export default function App() {
  return (
    <main className="flex h-[100lvh] overflow-hidden">
      <AppSideBar />
      <div className="flex-1 h-full flex flex-col relative">
        <AppNav />
        <div className="flex-1 max-h-full overflow-y-scroll px-[5%] min-[375px]:px-5 lg:px-8">
          <AlgoWrapper>
            <Routes>
              <Route path="/hello" Component={Hello} />
              <Route index Component={AlgokitDefault} />
            </Routes>
          </AlgoWrapper>
        </div>
      </div>
    </main>
  )
}
