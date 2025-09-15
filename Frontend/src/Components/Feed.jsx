import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./userCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getFeed = async () => {

    if (feed && feed.length > 0) {
      return;
    }
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
      console.error("Error fetching feed:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);


  if (loading) {
    return <div className="mt-16 flex justify-center h-full text-lg">Loading feed...</div>;
  }

  if (error) {
    return <div className="mt-16 flex justify-center h-full text-lg">Error loading feed.</div>;
  }

  if (!feed || feed.length === 0) {
    return (
      <div className="mt-16 flex justify-center h-full text-lg">
        <p>No feed available.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-16 h-full">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
