import Navbar from './Components/Navbar'
import { useNavigate, Outlet } from 'react-router-dom'
import Footer from './Components/Footer'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './utils/userSlice'


function Body() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user)

  const profileFetch = async () => {

    if (userData) return;

    try {
      const fetchProfile = await axios.get("/api/profile", {
        withCredentials: true
      });
      dispatch(addUser(fetchProfile.data));

    }
    catch (error) {
      if (error.status == 401) {
        navigate('/login')
      }
    }
  }

  useEffect(() => {
    profileFetch();
  }, [])

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body
