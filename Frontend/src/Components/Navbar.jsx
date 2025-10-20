import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';
import { removeFeed } from '../utils/feedSlice';

function Navbar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await axios.post(
        '/api/logout',
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      dispatch(removeFeed());
      navigate('/login');
    } catch (err) {
     
    }
  };

  return (
    <div className="navbar bg-neutral text-neutral-content shadow-sm px-4 sm:px-6">
         <div className="flex-1 flex flex-row items-center">
        <Link
          to="/"
          className="cursor-pointer"
          style={{ position: "relative", zIndex: 1000 }}
        >
          <img
            src="/assets/webLogo.png"
            alt="WebTinder Logo"
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
        </Link>
        <Link
          to="/"
          className="mx-4 text-md sm:text-xl md:text-2xl font-bold cursor-pointer"
          style={{ position: "relative", zIndex: 1000 }}
        >
          WebTinder
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-2 sm:gap-4">
          <p className="font-semibold text-sm sm:text-base md:text-lg">
            Welcome, {user?.user?.firstName}
          </p>

          {/* Mobile Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-8 sm:w-10 rounded-full">
                <img
                  alt="Avatar"
                  src={`http://localhost:8000${user?.user?.profilePhoto}`}
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-neutral text-neutral-content rounded-box z-50 mt-3 w-40 sm:w-52 p-2 shadow"
            >
              <li>
                <Link to="/Profile" className="justify-between text-sm sm:text-base">
                  Profile 
                </Link>
              </li>
              <li>
                <Link to="/Feed" className="text-sm sm:text-base">
                  Feed
                </Link>
              </li>
              <li>
                <Link to="/Connections" className="text-sm sm:text-base">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/ConnectionRequest" className="text-sm sm:text-base">
                  Requests
                </Link>
              </li>
              <li>
                <Link to="/Premium" className="text-sm sm:text-base">
                  Premium
                </Link>
              </li>
              <li>
                <button
                  onClick={handleClick}
                  className="text-sm sm:text-base w-full text-left"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
