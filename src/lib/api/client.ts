import type {
  ApiResponse,
  ApiSuccessResponse,
} from "./types";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? typeof window !== "undefined"
      ? ""
      : "https://mentorlagbe-server-wi7f.onrender.com"
    : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(
        /\/+$/,
        ""
      );

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly status: "fail" | "error";

  constructor(
    message: string,
    statusCode: number,
    status: "fail" | "error"
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.status = status;
  }
}

interface ApiRequestOptions extends RequestInit {
  headers?: HeadersInit;
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<ApiSuccessResponse<T>> {
  const headers = new Headers(options.headers);

  if (
    options.body &&
    !(options.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`,
    {
      ...options,
      headers,
      credentials: "include",
    }
  );

  const responseText = await response.text();

  let result: ApiResponse<T>;

  try {
    result = JSON.parse(responseText) as ApiResponse<T>;
  } catch {
    throw new ApiError(
      "Invalid server response.",
      response.status,
      "error"
    );
  }

  if (!response.ok || !result.success) {
    throw new ApiError(
      result.message || "Something went wrong.",
      response.status,
      result.success ? "error" : result.status
    );
  }

  return result;
}
