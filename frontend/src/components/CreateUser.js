import React, { useState } from "react";
import { saveUser } from "../api";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await saveUser(username);
      if (response && response.data) {
        setMessage("User saved successfully");
      } else {
        setMessage("Error: Unexpected response from server");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Save User</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default CreateUser;
