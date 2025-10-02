import axios from "axios";
import { useDispatch } from "react-redux";
import { addConnectionRequest } from "../utils/connectionRequestSlice";
import { removeFeed } from "../utils/feedSlice";

function UserCard({ user }) {
  const dispatch = useDispatch();

  const handleClickFetch = async (status, id) => {
    try {
      const res = await axios.post(
        "/api/request/send/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      console.log(res.data.saveData);
      dispatch(addConnectionRequest(res.data.saveData));
      dispatch(removeFeed(id));
    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  return (
    <div
      className="
        card 
        bg-neutral 
        h-2/3
        w-full 
        md:w-96
        shadow-md 
        text-amber-50 
        caret-transparent
      "
    >
      <figure>
        <img
          src={user?.profilePhoto}
          alt={user?.firstName}
          className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover"
        />
      </figure>
      <div className="card-body text-base sm:text-lg">
        <h2 className="card-title text-lg sm:text-xl">
          {user?.firstName + " " + user?.lastName}
        </h2>

        {user?.about && (() => {
          const displayText =
            user?.about.length > 100
              ? user?.about.slice(0, 100).trimEnd() + "..."
              : user?.about;
          return <p className="py-1 text-sm sm:text-base">{displayText}</p>;
        })()}

        <p className="text-sm sm:text-base">{user?.age}</p>
        <p className="text-sm sm:text-base">{user?.gender}</p>
        <p className="text-sm sm:text-base">{user?.skills}</p>

        <div className="card-actions justify-center gap-4 mt-4">
          <button
            className="btn btn-primary w-28 sm:w-32"
            onClick={() => handleClickFetch("ignore", user?._id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary w-28 sm:w-32"
            onClick={() => handleClickFetch("interested", user?._id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
