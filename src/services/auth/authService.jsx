import axiosInstance from "../axios";
import jwtDecode from "jwt-decode";

const authService = {
  signin: async (data) => {
    try {
      const result = await axiosInstance.post("auth/signin", data);
      localStorage.setItem("token", result.data.token);
      axiosInstance.defaults.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  signout: async () => {
    try {
      await axiosInstance.get("auth/signout");

      localStorage.removeItem("token");
      localStorage.removeItem("cart");

      axiosInstance.defaults.headers["Authorization"] = null;
      return;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  signup: async (data) => {
    try {
      const result = await axiosInstance.post("auth/signup", data);

      localStorage.setItem("token", result.data.token);
      axiosInstance.defaults.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  changePw: async (data) => {
    try {
      const result = await axiosInstance.post("auth/change-password", data);

      localStorage.removeItem("token");
      localStorage.removeItem("cart");

      axiosInstance.defaults.headers["Authorization"] = null;
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  decodeJwtToken: () => {
    return localStorage.getItem("token") ? jwtDecode(localStorage.getItem("token")) : null;
  },
  getRole: () => {
    return authService.decodeJwtToken() ? authService.decodeJwtToken().role : null;
  },
  isAuthen: () => {
    const decode = authService.decodeJwtToken();
    return decode != null && decode.exp * 1000 > new Date();
  },
  isAdmin: () => {
    const decode = authService.decodeJwtToken();
    return authService.isAuthen() && decode.role === "admin";
  },
};

export default authService;
