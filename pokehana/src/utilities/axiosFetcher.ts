// axiosFetcher.ts
import axios, { AxiosRequestConfig, Method } from "axios";

interface FetcherOptions extends AxiosRequestConfig {
  method?: Method;
  data?: any;
}

const axiosInstance = axios.create({
  baseURL: "/api/pokemon", // always call your API proxy
});

export async function axiosFetcher(
  endpoint: string,
  options: FetcherOptions = {}
) {
  const { method = "GET", data, ...restConfig } = options;

  try {
    const response = await axiosInstance.request({
      url: endpoint, // e.g. "/cards"
      method,
      data,
      ...restConfig,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
