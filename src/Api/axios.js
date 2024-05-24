import axios from "axios";

const axiosInstance = axios.create({
  //baseURL: "http://127.0.0.1:5001/clone-1d9f7/us-central1/api",
  // deployed verion of amazon  serever on render.com
  baseURL: "https://amazon-api-deploy-1-4nq9.onrender.com/",
});

export { axiosInstance };
