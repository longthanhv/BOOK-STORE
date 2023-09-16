import { default as axiosInstance } from "../axios";

const baseUrl = "/user/product";
const productService = {
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
};

export default productService;
