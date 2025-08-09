import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_POKEMON_URL || "";
const apiKey = process.env.NEXT_PUBLIC_POKEMON_API_KEY || "";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "X-Api-Key": apiKey,
  },
});

export async function axiosFetcher(endpoint: string) {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error: any) {
    // Optionally customize error handling
    throw new Error(error.response?.data?.message || error.message);
  }
}
