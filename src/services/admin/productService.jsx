import { default as axiosInstance } from "../axios";

const baseUrl = "/admin/product";
const productService = {
  getMany: async (query, limit) => {
    const {name, price, priceOnSale} = query;
    const { page, size } = limit;

    const params = {
      page,
      size,
    };
    name && (params.name = name);
    price && (params.price = +price);
    priceOnSale && (params.priceOnSale = +priceOnSale);
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
  getSale: async (query, limit) => {
    const {} = query;
    const { page, size } = limit;

    const params = {
      page,
      size,
    };
    
    try {
      const result = await axiosInstance.get(`${baseUrl}/get-sale`, {
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
    const formData = new FormData();
    const { images } = body;
    images.forEach((image) => {
      formData.append("product", image);
    });
    delete body.images;
    for (const key in body) {
      if (Object.hasOwnProperty.call(body, key)) {
        const value = body[key];
        if (Array.isArray(value)) {
          value.forEach((ele) => {
            formData.append(key, ele);
          });
        } else {
          formData.append(key, value);
        }
      }
    }
    try {
      const result = await axiosInstance.post(`${baseUrl}`, formData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
  edit: async (id, body) => {
    const formData = new FormData();
    const { images } = body;
    images.forEach((image) => {
      if (typeof image === "string") {
        formData.append("images", image);
      } else {
        formData.append("product", image);
      }
    });
    delete body.images;
    for (const key in body) {
      if (Object.hasOwnProperty.call(body, key)) {
        const value = body[key];
        if (Array.isArray(value)) {
          value.forEach((ele) => {
            formData.append(key, ele);
          });
        } else {
          formData.append(key, value);
        }
      }
    }
    try {
      const result = await axiosInstance.put(`${baseUrl}/${id}`, formData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });
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
  addStock: async (id, body) => {
    try {
      const result = await axiosInstance.put(`${baseUrl}/good-received/${id}`, body);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
  removeStock: async (id, body) => {
    try {
      const result = await axiosInstance.put(`${baseUrl}/good-delivery/${id}`, body);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return {};
    }
  },
};

export default productService;
