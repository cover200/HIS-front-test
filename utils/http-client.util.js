import axios from "axios";

const httpClient = axios.create();

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    return Promise.reject(response);
  }
);

export { httpClient };
