import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeUser } from '../utils/userSlice'
import { removeFeed } from '../utils/feedSlice'

function Navbar() {

  const user = useSelector(store => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      const res = await axios.post("/api/logout", {}, {
        withCredentials: true
      })
      dispatch(removeUser());
      dispatch(removeFeed());
      return navigate("/login")
    } catch (err) {
    }
  }

  return (
    <>
      <div className="navbar bg-neutral text-neutral-content shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
        </div>
        {user && (<div className="flex gap-2 items-center">
          <p className=' font-semibold text-lg'>Welcome, {user?.user?.firstName}</p>
          <div className="dropdown dropdown-end mx-5">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-neutral text-neutral-content rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/Profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to="/Feed">Feed</Link></li>
              <li><Link to="/Connections">Connections</Link></li>
              <li><Link to="/ConnectionRequest">Requests</Link></li>
              <li><a onClick={handleClick}>Logout</a></li>
            </ul>
          </div>
        </div>)}

      </div>
    </>
  )
}

export default Navbar
