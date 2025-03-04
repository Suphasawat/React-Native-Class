import axios from "axios";

const API_URL = "http://10.36.17.94:5000";

export const registerUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password,
    });
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error register user");
  }
};
