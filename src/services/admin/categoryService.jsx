import { default as axiosInstance } from "../axios";

const baseUrl = "/admin/category";
const categoryService = {
  getMany: async (query, limit) => {
    const params = { ...query, ...limit };

    try {
      const result = await axiosInstance.get(`${baseUrl}`, {
        params,
      });
      console.log(result, "category");
      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  },
  getOne: async (id) => {
    try {
      const result = await axiosInstance.get(`${baseUrl}/${id}`);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
  create: async (body) => {
    try {
      const result = await axiosInstance.post(`${baseUrl}`, body);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
  edit: async (id, body) => {
    try {
      const result = await axiosInstance.put(`${baseUrl}/${id}`, body);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
  delete: async (id) => {
    try {
      const result = await axiosInstance.delete(`${baseUrl}/${id}`);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
  changeStatus: async (id) => {
    try {
      const result = await axiosInstance.put(`${baseUrl}/change-status/${id}`);
      console.log(result);
      return result;
    } catch (error) {
      console.log(err);
      return {};
    }
  },
};

export default categoryService;
