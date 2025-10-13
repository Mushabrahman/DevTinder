import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from './Body'
import Profile from './Components/Profile'
import Login from './Components/Login'
import Feed from './Components/Feed.jsx'
import ConnectionRequest from './Components/ConnectionRequest.jsx'
import Connections from './Components/Connections'
import Premium from './Components/Premium.jsx'
import Chat from './Components/Chat.jsx'

function App() {

  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Body />}>
            <Route path='/' element={<Feed />} />
            <Route path='/Feed' element={<Feed />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/ConnectionRequest' element={<ConnectionRequest />} />
            <Route path='/Connections' element={<Connections />} />
            <Route path='/Premium' element={<Premium />} />
            <Route path='/Chat/:toUserId' element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
