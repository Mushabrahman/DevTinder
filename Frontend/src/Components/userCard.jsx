import axios from "axios"
import { useDispatch } from 'react-redux';
import { addConnectionRequest } from "../utils/connectionRequestSlice";
import { removeFeed } from "../utils/feedSlice";

function UserCard({ user }) {

    const dispatch = useDispatch()

    const handleClickFetch = async (status, id) => {
        try {
            const res = await axios.post("/api/request/send/" + status + "/" + id, {}, { withCredentials: true });
            console.log(res.data.saveData)
            dispatch(addConnectionRequest(res.data.saveData));
            dispatch(removeFeed(id))
        } catch (err) {

        }
    }

    return (
        <div className="card bg-neutral w-[450px] shadow-sm text-amber-50 max-h-[600px] caret-transparent">
            <figure className="">
                <img
                    src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
                    alt="User"
                    className="w-full h-96 object-fill"
                />
            </figure>
            <div className="card-body text-lg">
                <h2 className="card-title text-xl">{user?.firstName + " " + user?.lastName}</h2>
                {user?.about && (() => {
                    const displayText =
                        user?.about.length > 50
                            ? user?.about.slice(0, 50).trimEnd() + "..."
                            : user?.about;
                    return <h2 className="py-1">{displayText}</h2>;
                })()}
                <p>{user?.age}</p>
                <p>{user?.gender}</p>
                <p>{user?.skills}</p>
                <div className="card-actions justify-center gap-5 mt-4">
                    <button className="btn btn-primary " onClick={() => handleClickFetch("interested", user?._id)}>Interested</button>
                    <button className="btn btn-secondary" onClick={() => handleClickFetch("ignore", user?._id)}>Ignore</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
