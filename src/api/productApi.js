import axiosClient from "./AxiosClient";

const productApi = {
  getAll: () => {
    const url = "/store";
    return axiosClient.get(url);
  },
  getProduct: (slug) => {
    const url = `/store/${slug}`;
    return axiosClient.get(url);
  },
  getCategory: () => {
    const url = `/category`;
    return axiosClient.get(url);
  },
  getCategorybyId: (slug) => {
    const url = `/category/${slug}`;
    return axiosClient.get(url);
  },
  getProductByCategory: (slug) => {
    const url = `/store/category/${slug}`;
    return axiosClient.get(url);
  },
};

export default productApi;
