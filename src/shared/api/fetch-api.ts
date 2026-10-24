import { ApiError } from "./api-error";

export async function fetchApi<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new ApiError(
      `Request failed: ${response.status} - ${response.statusText}`,
      response.status,
    );
  }
  return response.json();
}
