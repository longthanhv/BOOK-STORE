import axiosInstance from "../axios";

const profileService = {
  get: async () => {
    try {
      const result = await axiosInstance.get("auth/profile");
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  edit: async (data) => {
    try {
      const result = await axiosInstance.put("auth/profile", data);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  editAvatar: async (body) => {
    const formData = new FormData();
    const { avatar } = body;
    formData.append("avatar", avatar);
    try {
      const result = await axiosInstance.put("auth/avatar", formData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  addAddress: async (data) => {
    try {
      const result = await axiosInstance.put("auth/address", data);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  delAddress: async (index) => {
    try {
      const result = await axiosInstance.delete(`auth/address/${index}`);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default profileService;
