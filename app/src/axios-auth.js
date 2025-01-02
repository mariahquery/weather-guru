import axios from "axios";

let API_URL = "/api/";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  params: {
    key: "f27998794ecf4c638f1185817241912",
  },
});
