import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import { Link } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";

export default function ConnectionRequest() {
  const [error, setError] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const socketRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const senderUserId = useSelector((s) => s.user?.user?._id);

  const connectionsFetch = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/connections", { withCredentials: true });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      setError(err.message);
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    connectionsFetch();

    if (!senderUserId) return;

    if (!socketRef.current) {
      socketRef.current = createSocketConnection();
    }
    const socket = socketRef.current;

    socket.emit("userConnected", senderUserId);

    const handleOnlineUpdate = (users) => {
      setOnlineUsers(users.map(String));
    };

    socket.on("onlineUserUpdate", handleOnlineUpdate);

    return () => {
      socket.off("onlineUserUpdate", handleOnlineUpdate);
    };
  }, [senderUserId, dispatch]);


  if (error) {
    return (
      <div className="mt-16 flex justify-center h-full text-lg caret-transparent select-none text-white">
        Error loading Connections
      </div>
    );
  }

  if (connections === null) {
    return (
      <div className="mt-16 flex justify-center h-full text-lg caret-transparent select-none text-white">
       Loading Connections...
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="mt-16 flex justify-center h-full text-lg caret-transparent select-none text-white">
        No connection request found
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-5 gap-7 mb-32 sm-mb-24 px-4 sm:px-6 caret-transparent select-none">
      <h1 className="text-xl sm:text-2xl font-bold caret-transparent select-none text-white">
        Connections
      </h1>
      {connections.map((ele) => {
        const { firstName, lastName, age, gender, skills, about, _id: id, profilePhoto } = ele.fromUserId;

        const isUserOnline = onlineUsers.includes(id);

        return (
          <div
            key={id}
            className="
                            w-full 
                            sm:w-11/12 
                            md:w-3/4 
                            lg:w-[45%] 
                            rounded-2xl 
                            card 
                            bg-neutral 
                            text-neutral-content
                            flex 
                            flex-col sm:flex-row 
                            items-center 
                            sm:items-start 
                            gap-4 sm:gap-6 
                            px-4 sm:px-6 
                            py-4 
                            caret-transparent 
                            select-none
                            relative"
          >
            <div className={`
                            absolute top-2 right-2 sm:top-4 sm:right-4 h-3 w-3 rounded-full 
                            ${isUserOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}
                        `}></div>

            <div className="flex-shrink-0">
              <img
                alt={firstName}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover cursor-default"
                src={profilePhoto}
              />
            </div>
            <div className="flex-1 flex flex-col justify-center gap-1 text-sm sm:text-base caret-transparent select-none">
              <h1 className="text-lg sm:text-xl font-semibold caret-transparent select-none">
                {firstName + " " + lastName}
              </h1>
              {age && gender && (
                <h2 className="text-sm sm:text-base caret-transparent select-none">
                  {age + ", " + gender}
                </h2>
              )}

              {about &&
                (() => {
                  const displayText =
                    about.length > 40 ? about.slice(0, 40) + "..." : about;
                  return (
                    <h2 className="py-1 text-sm sm:text-base caret-transparent select-none">
                      {displayText}
                    </h2>
                  );
                })()}

              {skills &&
                (() => {
                  const text = typeof skills === "string" ? skills : String(skills);
                  const maxChars = 30;
                  const displayText =
                    text.length > maxChars ? text.substring(0, maxChars - 3) + "..." : text;
                  return (
                    <h2 className="text-sm sm:text-base caret-transparent select-none">
                      {displayText}
                    </h2>
                  );
                })()}
            </div>
            <Link
              to={`/chat/${id}`}
              state={{
                profilePhoto: profilePhoto,
                firstName: firstName
              }}
              className="flex justify-center items-center py-2 px-4 rounded-xl bg-pink-500 cursor-pointer hover:bg-pink-600"
            >
              Chat
            </Link>
          </div>
        );
      })}
    </div>
  );
}