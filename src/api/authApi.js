import axiosClient from "./AxiosClient";

const authApi = {
  login: (values) => {
    const url = "/accounts/login";
    return axiosClient.post(url, values);
  },
  register: (values) => {
    const url = "/accounts/register";
    return axiosClient.post(url, values);
  },
  logout: () => {
    const url = "/accounts/logout";
    return axiosClient.post(url);
  },
};

export default authApi;
