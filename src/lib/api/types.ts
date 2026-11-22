
export interface PaginationMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiSuccessResponse<T> {
  success: true;
  status: "success";
  message: string;
  data?: T;
  pagination?: PaginationMetadata;
}

export interface ApiErrorResponse {
  success: false;
  status: "fail" | "error";
  message: string;
}

export type ApiResponse<T> =
  | ApiSuccessResponse<T>
  | ApiErrorResponse;
