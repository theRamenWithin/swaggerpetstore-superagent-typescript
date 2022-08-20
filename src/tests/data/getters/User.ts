import request from "superagent";
import { handleResponse } from "src/tests/data/helpers";
import { ApiResponse, User } from "src/model/data/interfaces";

const agent = request.agent();
const url = `${process.env.BASE_URL}/user`;

export class GetUser {
    /**
     * Get user by user name
     * @param username The name that needs to be fetched. Use user1 for testing.
     */
    static async getByUsername(username: string): Promise<User | ApiResponse> {
        return await agent
            .get(`${url}/${username}`)
            .accept("json")
            .then((res) => handleResponse<User>(res))
            .catch((err: request.ResponseError) => handleResponse(err));
    }

    /**
     * Logs user into the system
     * @description For testing use "string" for username and password
     * @param username The user name for login
     * @param password The password for login in clear text
     * @todo Return headers for assertion: 'X-Expires-After' + 'X-Rate-Limit'
     * @returns ApiResponse
     */
    static async login(
        username: string,
        password: string
    ): Promise<ApiResponse> {
        return await agent
            .get(`${url}/login`)
            .accept("json")
            .query({ username, password })
            .then((res) => handleResponse(res))
            .catch((err: request.ResponseError) => handleResponse(err));
    }

    /**
     * Logs out current logged in user session
     */
    static async logout(): Promise<ApiResponse> {
        return await agent
            .get(`${url}/logout`)
            .accept("json")
            .then((res) => handleResponse(res));
        // No error state to catch
    }
}
