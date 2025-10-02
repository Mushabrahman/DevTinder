import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

export default function ConnectionRequest() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const connectionsFetch = async () => {
    try {
      const res = await axios.get("/api/connections", { withCredentials: true });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    connectionsFetch();
  }, []);

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
        Something went wrong
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
        const { firstName, lastName, age, gender, skills, about, id,profilePhoto } = ele.fromUserId;
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
            "
          >
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
          </div>
        );
      })}
    </div>
  );
}
