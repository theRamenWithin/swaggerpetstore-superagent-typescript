import { ApiResponse } from "src/model/data/interfaces";
import request from "superagent";

function isResError(
    res: request.Response | request.ResponseError
): res is request.Response {
    return (res as request.Response).body !== undefined;
}

export function handleResponse<T = ApiResponse>(
    res: request.Response | request.ResponseError
): Promise<T | ApiResponse> {
    return Promise.resolve(
        isResError(res) ? (res.body as T) : (res.response?.body as ApiResponse)
    );
}
