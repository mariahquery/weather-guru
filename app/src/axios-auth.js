import axios from "axios";

let API_URL = "/api/";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  params: {
    key: "f27998794ecf4c638f1185817241912",
  },
});

axiosInstance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axiosInstance.defaults.xsrfCookieName = "csrftoken";
axiosInstance.defaults.xsrfHeaderName = "X-CSRFToken";
axiosInstance.defaults.withCredentials = true;
