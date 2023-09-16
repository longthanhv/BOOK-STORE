import { default as axiosInstance } from "../axios";

const baseUrl = "/user/review";
const reviewService = {
  getMany: async (productId, limit) => {
    const { page, size } = limit;

    const params = {
      page,
      size,
    };

    try {
      const result = await axiosInstance.get(`${baseUrl}/${productId}`, {
        params,
      });
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  },
  create: async (productId, body) => {
    try {
      const result = await axiosInstance.post(`${baseUrl}/${productId}`, body);
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
};

export default reviewService;
