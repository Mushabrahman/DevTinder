import axios from "axios"
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";


export default function ConnectionRequest() {

    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const connections = useSelector(store => store.connections);

    const connectionsFetch = async () => {
        try {
            const res = await axios.get("/api/connections", { withCredentials: true });
            dispatch(addConnections(res.data.data))
        }
        catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        connectionsFetch();
    }, [])

    if (error) {
        return <div className="mt-16 flex justify-center h-full text-lg">Error loading Connections</div>;
    }

    if (connections === null) {
        return <div className="mt-16 flex justify-center h-full text-lg">Something went wrong</div>
    }

    if (connections.length === 0) {
        return <div className="mt-16 flex justify-center h-full text-lg">No connection request found</div>
    }

    return (
        <div className="flex justify-center items-center flex-col mt-5 gap-7 mb-24 caret-transparent">
            <h1 className="mb-2.5 text-2xl font-bold">Connection Requests</h1>
            {connections.map((ele) => {
                const { firstName, lastName, age, gender, skills, about,id } = ele.fromUserId;
                return (
                    <div className="h-52 w-[29%] rounded-2xl bg-neutral text-white flex items-center px-5 pl-9 justify-center gap-9" key={id}>
                        <div>
                            <img
                                alt={firstName}
                                className="w-24 rounded-full "
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                        <div className="w-[80%]  px-2.5 flex flex-col justify-center gap-1 text-lg h-44">
                            <h1 className="text-xl font-semibold mb-2">{firstName + " " + lastName}</h1>
                            {age && gender && <h2>{age + ", " + gender}</h2>}
                            {about && (() => {
                                const displayText =
                                    about.length > 40
                                        ? about.slice(0, 40) + "..."
                                        : about;
                                return <h2 className="py-1">{displayText}</h2>;
                            })()}

                            {skills && (() => {
                                const text = typeof skills === "string" ? skills : String(skills);
                                const maxChars = 30;
                                const displayText =
                                    text.length > maxChars
                                        ? text.substring(0, maxChars - 3) + "..."
                                        : text;
                                return <h2>{displayText}</h2>;
                            })()}


                        </div>
                    </div>
                )
            })}
        </div>
    )
};