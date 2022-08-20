import { ApiResponse } from "src/model/data/interfaces";

export class ExpectedBasic {
    static response(
        message: string | number,
        code = 200,
        type = "unknown"
    ): ApiResponse {
        return {
            code,
            type,
            message: String(message),
        };
    }
}
