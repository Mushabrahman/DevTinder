import { useState } from 'react'
import UserCard from './userCard'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import axios from 'axios'


function EditProfile({ user }) {


    const [firstName, setFirstName] = useState(user?.user?.firstName || "")
    const [lastName, setLastName] = useState(user?.user?.lastName || "")
    const [about, setAbout] = useState(user?.user?.about || "")
    const [skills, setSkills] = useState(user?.user?.skills || "")
    const [gender, setGender] = useState(user?.user?.gender || "")
    const [age, setAge] = useState(user?.user?.age || "")
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const editProfileFetch = async () => {
        try {
            const res = await axios.patch("/api/editUser", { firstName, lastName, about, skills, gender, age }, {
                withCredentials: true
            });
            dispatch(addUser(res.data));
        } catch (err) {
            setError(err.message);
        }
    }

    if (error) {
        return <div className="mt-16 flex justify-center h-full text-lg">Error loading Edit Profile</div>;
    }


    return (
        <>
            <div className='flex justify-center mt-12 mb-30 gap-10'>

                <div className="card bg-neutral text-neutral-content w-96 shadow-sm">
                    <h1 className='text-center pt-8 from-neutral-200 font-semibold text-xl'>Edit Profile!</h1>

                    <figure className="flex-col  pt-5">
                        <label className='flex items-start font-semibold'>
                            First Name
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
                                type="text"
                                placeholder="Firsft Name"
                                value={firstName}
                                name="firstName"
                                className='text-black font-semibold'
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </label>
                    </figure>

                    <figure className="flex-col  pt-5">
                        <label className='flex items-start font-semibold'>
                            Last Name
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
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                name="lastName"
                                className='text-black font-semibold'
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </label>
                    </figure>

                    <figure className="flex-col  pt-5">
                        <label className='flex items-start font-semibold'>
                            About
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
                                type="text"
                                placeholder="About"
                                value={about}
                                name="about"
                                className='text-black font-semibold'
                                onChange={(e) => setAbout(e.target.value)}
                            />
                        </label>
                    </figure>

                    <figure className="flex-col  pt-5">
                        <label className='flex items-start font-semibold'>
                            Skills
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
                                type="text"
                                placeholder="skills"
                                value={skills}
                                name="skills"
                                className='text-black font-semibold'
                                onChange={(e) => setSkills(e.target.value)}
                            />
                        </label>
                    </figure>

                    <figure className="flex-col  pt-5">
                        <label className='flex items-start font-semibold'>
                            Gender
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
                                type="text"
                                placeholder="gender"
                                value={gender}
                                name="password"
                                className='text-black font-semibold'
                                onChange={(e) => setGender(e.target.value)}
                            />
                        </label>
                    </figure>

                    <figure className="flex-col  pt-5">
                        <label className='flex items-start font-semibold'>
                            Age
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
                                type="number"
                                maxLength={2}
                                placeholder="age"
                                value={age}
                                name="age"
                                className='text-black font-semibold'
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </label>
                    </figure>

                    <div className="card-body items-center text-center">
                        <div className="card-actions">
                            <button type="button" className="btn btn-primary" onClick={editProfileFetch}>Save Profile</button>
                        </div>
                    </div>
                </div>

                <UserCard user={{ firstName, lastName, age, about, skills, gender }} />
            </div>
        </>
    )
}

export default EditProfile
