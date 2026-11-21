export interface ApiSuccessResponse<T> {
  success: true;
  status: "success";
  message: string;
  data?: T;
}

export interface ApiErrorResponse {
  success: false;
  status: "fail" | "error";
  message: string;
}

export type ApiResponse<T> =
  | ApiSuccessResponse<T>
  | ApiErrorResponse;