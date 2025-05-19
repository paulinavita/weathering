import { ApiError } from "../services/errorHandler";
export default async function fetcher<T = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, init);

  if (!res.ok) {
    try {
      const errorData = await res.json();
      if (errorData.code && errorData.message) {
        throw new ApiError(errorData.message, errorData.code);
      } else {
        throw new ApiError(
          errorData.message || `Error ${res.status}`,
          errorData.code || String(res.status)
        );
      }
    } catch (e) {
      if (!(e instanceof ApiError)) {
        throw new ApiError(`Error ${res.status}`, String(res.status));
      }
      throw e;
    }
  }

  return res.json();
}
