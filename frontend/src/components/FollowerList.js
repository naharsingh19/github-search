import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFollowers } from "../api";

const FollowerList = () => {
  const { username } = useParams();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const data = await getFollowers(username);
        setFollowers(data);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };
    fetchFollowers();
  }, [username]);

  return (
    <div>
      <h2>Followers of {username}</h2>
      <ul>
        {followers.map((follower) => (
          <li key={follower.id}>{follower.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default FollowerList;
