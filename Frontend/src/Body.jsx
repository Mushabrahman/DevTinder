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
  const userData = useSelector((store) => store.user);

  const profileFetch = async () => {
    if (userData) return;

    try {
      const fetchProfile = await axios.get("/api/profile", {
        withCredentials: true
      });
      dispatch(addUser(fetchProfile.data));
    }
    catch (error) {
      if (error.status === 401) {
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    profileFetch();
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background grid pattern with drifting animation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:30px_30px] animate-[moveGrid_15s_linear_infinite]"></div>

      {/* Animated tech-like lines/dots */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              {/* Pulsing dots */}
              <circle cx="4" cy="4" r="2" fill="cyan" className="animate-pulse" />
              {/* Glowing horizontal line */}
              <line 
                x1="4" y1="4" x2="80" y2="4" 
                stroke="cyan" strokeWidth="0.5" 
                className="animate-[glow_2s_ease-in-out_infinite]" 
              />
              {/* Glowing vertical line */}
              <line 
                x1="4" y1="4" x2="4" y2="80" 
                stroke="cyan" strokeWidth="0.5" 
                className="animate-[glow_2s_ease-in-out_infinite]" 
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />

      {/* Keyframes */}
      <style>
        {`
          @keyframes moveGrid {
            0% { background-position: 0px 0px; }
            100% { background-position: 60px 60px; }
          }
          @keyframes glow {
            0%, 100% { stroke-opacity: 0.2; }
            50% { stroke-opacity: 0.8; }
          }
        `}
      </style>
    </div>
  );
}

export default Body;
