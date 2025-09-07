import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Body from './Body'
import Profile from './Components/Profile'
import Login from './Components/Login'
import Feed from './Components/Feed.jsx'

function App() {

  return (
    <>
      <BrowserRouter basename='/'>
       <Routes>
         <Route path='/' element={<Body/>}>
          <Route path='/Feed' element={<Feed/>}/>
          <Route path='/Profile' element={<Profile/>}/>
           <Route path='/Login' element={<Login/>}/>
         </Route>
       </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
