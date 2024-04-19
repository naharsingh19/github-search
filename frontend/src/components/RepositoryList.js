import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRepositories } from "../api";

const RepositoryList = () => {
  const { username } = useParams();
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const data = await getRepositories(username);
        setRepositories(data);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };
    fetchRepositories();
  }, [username]);

  return (
    <div>
      <h2>Repositories for {username}</h2>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RepositoryList;
