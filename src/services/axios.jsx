import axios from "axios";

export const baseURL = "http://127.0.0.1:8000";
export const version = "api/v1";

const axiosInstance = axios.create({
  baseURL: `${baseURL}/${version}`,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("token") ? "Bearer " + localStorage.getItem("token") : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (typeof error.response === "undefined") {
      alert(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly."
      );
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      window.location.href = "authentication/sign-in";
      return Promise.reject(error);
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;
