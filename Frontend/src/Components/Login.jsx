import { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [emailId, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('');
  const [isLogedin, setIsLogedin] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const fetchUser = async () => {
    try {
      const fetch = await axios.post('/api/login', {
        emailId,
        password
      })
      dispatch(addUser(fetch.data));
      navigate('/feed')
    }
    catch (err) {
      setError(err?.response?.data?.error || "Something went wrong")
    }
  }

  const fetchSignup = async () => {
    try {
      await axios.post('/api/signup', { firstName, lastName, password, emailId }, { withCredentials: true });
      fetchUser();
      setIsLogedin(true);
    } catch (err) {
      setError(err?.response?.data?.error || "Something went wrong")
    }
  }

  return (
    <div
      className={`
      min-h-screen flex items-center justify-center mb-16 px-4 sm:px-6
      ${isLogedin ? "mt-0" : "mb-30 md:mb-28 mt-10 sm:mt-16 md:mt-20"}
    `}
    >
      <div className="card bg-neutral text-neutral-content w-full sm:w-[400px] md:w-[450px] lg:w-[480px] shadow-md rounded-xl">
        <h1 className="text-center pt-8 font-semibold text-lg sm:text-xl md:text-2xl caret-transparent">
          {isLogedin ? "Enter your credentials!" : "Create an account!"}
        </h1>

        {!isLogedin && (
          <>

            <figure className="flex-col pt-5 px-4 sm:px-6">
              <label className="font-semibold caret-transparent">First Name</label>
              <label className="input validator mt-2 flex items-center gap-2">
                <input
                  type="text"
                  required
                  placeholder="First Name"
                  value={firstName}
                  name="firstName"
                  minLength="2"
                  className="text-black font-semibold flex-1 p-2 rounded-md outline-none"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
            </figure>

            <figure className="flex-col pt-5 px-4 sm:px-6">
              <label className="font-semibold caret-transparent">Last Name</label>
              <label className="input validator mt-2 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  name="lastName"
                  className="text-black font-semibold flex-1 p-2 rounded-md outline-none"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </figure>
          </>
        )}

        <figure className="flex-col pt-6 px-4 sm:px-6">
          <label className="font-semibold caret-transparent">Email</label>
          <label className="input validator mt-2 flex items-center gap-2">
            <input
              type="email"
              placeholder="mail@site.com"
              name="email"
              value={emailId}
              required
              className="text-black font-semibold flex-1 p-2 rounded-md outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </figure>

        <figure className="flex-col pt-5 px-4 sm:px-6">
          <label className="font-semibold caret-transparent ">Password</label>
          <label className="input validator mt-2 flex items-center gap-2">
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              name="password"
              minLength="8"
              className="text-black font-semibold flex-1 p-2 rounded-md outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </figure>

        {/* Actions */}
        <div className="card-body items-center text-center">
          <div className="text-red-500 text-sm">{error}</div>
          <div className="card-actions w-full flex justify-center">
            {isLogedin ? (
              <button
                type="button"
                className="btn btn-primary w-full sm:w-auto"
                onClick={fetchUser}
              >
                Login
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary w-full sm:w-auto"
                onClick={fetchSignup}
              >
                Sign Up
              </button>
            )}
          </div>
        </div>

        <span
          className="flex justify-center mb-8 cursor-pointer text-sm sm:text-base text-blue-400 caret-transparent"
          onClick={() => setIsLogedin((prev) => !prev)}
        >
          {isLogedin
            ? "Don't have an account? Signup"
            : "Have an account? Login"}
        </span>
      </div>
    </div>
  );

}

export default Login
