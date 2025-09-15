import axios from "axios"
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnectionRequest } from "../utils/connectionRequestSlice";
import { removeFeed } from "../utils/feedSlice";


export default function ConnectionRequest() {

    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const requests = useSelector(store => store.requests);

    const connectionRequestFetch = async () => {
        try {
            const res = await axios.get("/api/request/received", { withCredentials: true });
            dispatch(addConnectionRequest(res.data.data))
        }
        catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        connectionRequestFetch();
    }, [])

    const handleClick = async (status, id) => {
        try {
            const updateStatus = await axios.post("/api/request/review/" + status + "/" + id, {}, { withCredentials: true });
            dispatch(removeFeed(id))
            console.log(updateStatus);
        } catch (err) {
             setError(err.message);
        }
    }

    if (error) {
        return <div className="mt-16 flex justify-center h-full text-lg">Error loading Requests</div>;
    }

    if (!requests || requests.length==0) {
        return <div className="mt-16 flex justify-center h-full text-lg">No connection request found</div>
    }

    return (
        <div className="flex justify-center items-center flex-col mt-5 gap-7 mb-24 caret-transparent">
            <h1 className=" text-2xl font-bold">Connection Requests</h1>
            {requests.map((ele) => {
                const { _id, firstName, lastName, age, gender, about } = ele.fromUserId;
                return (
                    <div className="h-44 w-1/3 rounded-2xl bg-neutral text-white flex items-center p-5 gap-6" key={_id}>
                        <div>
                            <img
                                alt={firstName}
                                className="w-20 rounded-full "
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                        <div className="w-[50%] p-2.5 font-semibold">
                            <h1 className="text-md font-semibold">{firstName + " " + lastName}</h1>
                            {age && gender && <h2>{age + ", " + gender}</h2>}
                            {about && <h2>{about}</h2>}
                        </div>
                        <div className="flex gap-5">
                            <button className="p-3 border-2 border-blue-500 rounded-lg text-blue-400 w-20 cursor-pointer" onClick={() => handleClick("accepted", _id)}>Accept</button>
                            <button className="p-3 border-2  border-pink-500 rounded-lg text-pink-500 w-20 cursor-pointer" onClick={() => handleClick("rejected", _id)}>Reject</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
};