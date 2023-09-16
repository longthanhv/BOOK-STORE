import { default as axiosInstance } from "../axios";

const baseUrl = "/admin/order";
const orderService = {
  getMany: async (query, limit) => {
    const { name } = query;
    const { page, size } = limit;

    const params = {
      page,
      size,
    };

    name && (params.name = name);

    try {
      const result = await axiosInstance.get(`${baseUrl}`, {
        params,
      });
      console.log(result);
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
  cancel: async (id) => {
    try {
      const result = await axiosInstance.put(`${baseUrl}/cancel/${id}`);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
  verify: async (id) => {
    try {
      const result = await axiosInstance.put(`${baseUrl}/verify/${id}`);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
};

export default orderService;
