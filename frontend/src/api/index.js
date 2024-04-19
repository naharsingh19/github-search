import axios from "axios";

const API_BASE_URL = "http://localhost:5000/users";

export const saveUser = async (username) => {
  const url = `http://localhost:5000/users/${username}`; // Construct the complete URL
  try {
    const response = await axios.post(url);
    console.log("Response from server:", response); // Log the response
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error:", error); // Log the error
    throw error.response?.data?.message || "Unknown error occurred";
  }
};

export const getRepositories = async (username) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${username}`);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getFollowers = async (username) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/friends/${username}`);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
