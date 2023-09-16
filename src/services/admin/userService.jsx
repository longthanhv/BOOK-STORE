import { default as axiosInstance } from "../axios";

const userService = {
  getMany: async (query, limit) => {
    const { username, name } = query;
    const { page, size } = limit;

    const params = {
      page,
      size,
    };

    username && (params.username = username);
    name && (params.name = name);

    try {
      const result = await axiosInstance.get("/admin/user", {
        params,
      });
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  },
  getOne: async (userId) => {
    try {
      const result = await axiosInstance.get(`/admin/user/${userId}`);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
  create: async (body) => {
    try {
      const result = await axiosInstance.post(`/admin/user`, body);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
  edit: async (userId, body) => {
    try {
      const result = await axiosInstance.put(`/admin/user/${userId}`, body);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
  delete: async (userId) => {
    try {
      const result = await axiosInstance.delete(`/admin/user/${userId}`);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
};

export default userService;
