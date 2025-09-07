import { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';


function Login() {

  const [emailId,setEmail] = useState('uuu01@gmail.com')
  const [password,setPassword] = useState('Uuu@123456');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error,setError] = useState();

  const fetchUser = async () => {
    try{
    const fetch = await axios.post('/api/login',{
      emailId,
      password
    })
  dispatch(addUser(fetch.data));
  navigate('/feed')
    }
   catch(err) {
    console.log("Error", err)
      setError(err?.response?.data?.error || "Something went wrong")
    }
  }


  return (
    <>
     <div className='flex justify-center my-40'>
            <div className="card bg-neutral text-neutral-content w-96 shadow-sm">
                <h1 className='text-center pt-8 from-neutral-200 font-semibold text-xl'>Enter your credentials!</h1>
                <figure className="flex-col  pt-10">
                    <label className='flex items-start font-semibold'>
                        Email 
                    </label>
                    <label className="input validator mt-2 ">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input type="email" placeholder="mail@site.com" name="email" value={emailId} required className='text-black font-semibold' onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <div className="validator-hint hidden">Enter valid email address</div>

                </figure>
                <figure className="flex-col  pt-5">
                    <label className='flex items-start font-semibold'>
                        Password 
                    </label>
                    <label className="input validator mt-2">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                ></path>
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                            </g>
                        </svg>
                        <input
                            type="password"
                            required
                            placeholder="Password"
                            value={password}
                            name="password"
                            minlength="8"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                            className='text-black font-semibold'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <p className="validator-hint hidden">
                        Must be more than 8 characters, including
                        <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                    </p>

                </figure>
                <div className="card-body items-center text-center">
                    <div className='text-red-700'>
                        {error}
                    </div>
                    <div className="card-actions">
                        <button type="button" className="btn btn-primary" onClick={fetchUser}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login
