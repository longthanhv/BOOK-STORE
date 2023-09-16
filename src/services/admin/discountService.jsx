import { default as axiosInstance } from "../axios";

const baseUrl = "/admin/discount";
const categoryService = {
  getMany: async (query, limit) => {
    const params = { ...query, ...limit };

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
  getOne: async (code) => {
    try {
      const result = await axiosInstance.get(`${baseUrl}/${code}`);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
  create: async (body) => {
    body.type === "freeShip" && (body.discount = 0);
    try {
      const result = await axiosInstance.post(`${baseUrl}`, body);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
  edit: async (code, body) => {
    try {
      const result = await axiosInstance.put(`${baseUrl}/${code}`, body);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
  revoke: async (code) => {
    try {
      const result = await axiosInstance.put(`${baseUrl}/revoke/${code}`);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
};

export default categoryService;
