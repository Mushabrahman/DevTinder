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
      dispatch(addConnectionRequest(res.data.saveData));
      dispatch(removeFeed(id));
    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  // inside your component
const getProfilePhotoSrc = () => {
  if (user?.profilePhoto?.startsWith("/uploads/")) {
    // Image from backend
    return `http://localhost:8000${user?.profilePhoto}`;
  } else if (user?.profilePhoto) {
    // Full external URL (optional case)
    return user?.profilePhoto;
  } else {
    // Default placeholder
    return "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  }
};


  return (
    <div className="flex justify-center items-center">
      <div
        className="
        card 
        flex
        bg-neutral 
        h-1/2
        w-[310px]
        md:w-80
        shadow-md 
        text-amber-50 
        caret-transparent
      "
      >

        <figure>
          <img
            src={getProfilePhotoSrc()}
            alt={user?.firstName}
            className="w-full h-64 object-cover"
          />
        </figure>
        <div className="card-body text-base sm:text-lg mb-2">
          <h2 className="card-title text-xl sm:text-2xl mb-2">
            {user?.firstName + " " + user?.lastName}
          </h2>

          <div className="w-max">
            {(user?.age || user?.gender) && (
              <p className="text-sm sm:text-base font-light text-center rounded-2xl py-1 px-3 bg-gray-700">
                {user?.age}{user?.age && user?.gender ? ", " : ""}{user?.gender}
              </p>
            )}
          </div>

          {user?.about && (() => {
            const displayText =
              user?.about.length > 100
                ? user?.about.slice(0, 100).trimEnd() + "..."
                : user?.about;
            return <p className="py-1 text-sm sm:text-base">{displayText}</p>;
          })()}

          <p className="text-sm sm:text-base">{user?.skills}</p>

          <div className="card-actions text-lg justify-center gap-4 mt-4">
            <button
              className="btn btn-primary w-28 md:w-32 flex items-center justify-center gap-1 bg-neutral text-lg"
              onClick={() => handleClickFetch("ignore", user?._id)}
            >
              <span className="!text-blue-600">✖</span>
              <span>Ignore</span>
            </button>
            <button
              className="btn btn-secondary w-28 md:w-32 flex items-center justify-center gap-1 bg-neutral text-lg"
              onClick={() => handleClickFetch("interested", user?._id)}
            >
              <span className="text-pink-600">♥</span>
              <span>Interested</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default UserCard;
