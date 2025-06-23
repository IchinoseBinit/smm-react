import { AxiosError } from "axios";

export async function safeApiCall<T>(apiCall: () => Promise<T>): Promise<T> {
  try {
    return await apiCall();
  } catch (err) {
    const error = err as AxiosError<{ error: string }>;
    const message = error.response?.data?.error || error.message;
    throw new Error(message);
  }
}
