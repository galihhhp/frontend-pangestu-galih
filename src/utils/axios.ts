import axios from "axios";

const instance = axios.create({
  baseURL: "http://202.157.176.100:3001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error?.message || error.message || "Something went wrong";
    throw new Error(message);
  }
);

export default instance;

export type ApiResponse<T> = Promise<T>;

export const api = {
  get: <T>(url: string, config = {}) => instance.get<any, T>(url, config),
  post: <T>(url: string, data = {}, config = {}) =>
    instance.post<any, T>(url, data, config),
  put: <T>(url: string, data = {}, config = {}) =>
    instance.put<any, T>(url, data, config),
  delete: <T>(url: string, config = {}) => instance.delete<any, T>(url, config),
  patch: <T>(url: string, data = {}, config = {}) =>
    instance.patch<any, T>(url, data, config),
}; 