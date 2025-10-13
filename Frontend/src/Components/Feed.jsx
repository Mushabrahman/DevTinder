import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addFeed, removeFeed } from "../utils/feedSlice";
import { addConnectionRequest } from "../utils/connectionRequestSlice";
import UserCard from "./userCard";
import { motion } from "framer-motion";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    const [requestError, setRequestError] = useState(null);

  const getFeed = async () => {
    if (feed && feed.length > 0) return;

    setLoading(true);
    try {
      const res = await axios.get("/api/feed", { withCredentials: true });
      const data = res?.data?.data;
      if (data && Array.isArray(data)) {
        dispatch(addFeed(data));
      } else {
        console.warn("Feed: unexpected data format", data);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const sendRequest = async (status, user) => {
    try {
      const res = await axios.post(
        "/api/request/send/" + status + "/" + user._id,
        {},
        { withCredentials: true }
      );
      dispatch(addConnectionRequest(res.data.saveData));
      dispatch(removeFeed(user._id));
    } catch (err) {
     setRequestError(err);
    }
  };

  const handleDragEnd = (event, info, user) => {
    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;

    if (offsetX > 100 || velocityX > 500) {
      sendRequest("interested", user); 
    } else if (offsetX < -100 || velocityX < -500) {
      sendRequest("ignore", user); 
    }
  };

  if (loading) {
    return (
      <div className="mt-16 flex justify-center h-full text-lg text-white">
        Loading feed...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-16 flex justify-center h-full text-lg text-white">
        Error loading feed.
      </div>
    );
  }

  if (requestError) {
    return (
      <div className="mt-16 flex justify-center h-full text-lg text-white">
        Error in sending the error, please reload the page.
      </div>
    );
  }

  if (!feed || feed.length === 0) {
    return (
      <div className="mt-16 flex justify-center h-full text-lg text-white">
        <p>No feed available.</p>
      </div>
    );
  }

  const user = feed[0];

  return (
    <div className="flex justify-center px-4 mt-6 mb-32 sm:mt-10 sm:mb-40 md:mt-10">
      <div className="w-full max-w-md relative h-[600px]">
        <motion.div
          key={user._id}
          className="absolute w-full"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(event, info) => handleDragEnd(event, info, user)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileDrag={{ rotate: info => info.offset.x / 20 }}
          transition={{ duration: 0.3 }}
        >
          <UserCard user={user} />
        </motion.div>
      </div>
    </div>
  );
};

export default Feed;
