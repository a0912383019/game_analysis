// interface apiBase {
//   platform: string
// }

// // 共用的回應基底結構
// interface BaseResponse {
//   result: "success" | "error";
// }

// // 成功回應的結構（泛型）
// interface SuccessResponse<T> extends BaseResponse {
//   result: "success";
//   ret: T;
// }

// // 失敗回應的結構
// interface ErrorResponse extends BaseResponse {
//   result: "error";
//   code: string;
//   message: string;
//   error_detail?: string;
// }

// // 通用的 API 回傳結構
// type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

interface BaseStatus {
  return_code: string
  error_code?: string
  errors?: string
  message: string
}

// 共用的回應基底結構
interface BaseResponse<T> {
  status: BaseStatus
  result: T
}

// // 成功回應的結構（泛型）
// interface SuccessResponse<T> extends BaseResponse {
//   result: 'success'
//   ret: T
// }

// // 失敗回應的結構
// interface ErrorResponse extends BaseResponse {
//   result: 'error'
//   code: string
//   message: string
//   error_detail?: string
// }

// // 通用的 API 回傳結構
// type ApiResponse<T> = SuccessResponse<T> | ErrorResponse
