export interface ActionParams {
  workerId: string;
  jobId: string;
}

export interface ActionErrorResponse {
  errorCode: string;
  message: string;
  success: boolean;
}

export interface ActionSuccessResponse {
  success: boolean;
}
