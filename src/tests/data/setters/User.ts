import request from "superagent";
import { handleResponse } from "src/tests/data/helpers";
import { ApiResponse, User } from "src/model/data/interfaces";

const agent = request.agent();
const url = `${process.env.BASE_URL}/user`;

export class SetUser {
    /**
     * Creates list of users with given input array
     * @param users List of user object
     */
    static async createWithList(users: User[]): Promise<ApiResponse> {
        return await agent
            .post(`${url}/createWithList`)
            .accept("json")
            .type("json")
            .send(users)
            .then((res) => handleResponse(res))
            .catch((err: request.ResponseError) => handleResponse(err));
    }

    /**
     * Update user
     * @description This can only be done by the logged in user.
     * @param username name that need to be updated
     * @param user Updated user object
     */
    static async update(username: string, user: User): Promise<ApiResponse> {
        return await agent
            .put(`${url}/${username}`)
            .accept("json")
            .type("json")
            .send(user)
            .then((res) => handleResponse(res))
            .catch((err: request.ResponseError) => handleResponse(err));
    }

    /**
     * Delete user
     * @description This can only be done by the logged in user.
     * @param username The name that needs to be deleted
     */
    static async delete(username: string): Promise<ApiResponse> {
        return await agent
            .delete(`${url}/${username}`)
            .accept("json")
            .then((res) => handleResponse(res))
            .catch((err: request.ResponseError) => handleResponse(err));
    }

    /**
     * Creates list of users with given input array
     * @param users List of user object
     */
    static async createWithArray(users: User[]): Promise<ApiResponse> {
        return await agent
            .post(`${url}/createWithArray`)
            .accept("json")
            .type("json")
            .send(users)
            .then((res) => handleResponse(res))
            .catch((err: request.ResponseError) => handleResponse(err));
    }

    /**
     * Create user
     * @description This can only be done by the logged in user.
     * @param user Created user object
     */
    static async create(user: User): Promise<ApiResponse> {
        return await agent
            .post(url)
            .accept("json")
            .type("json")
            .send(user)
            .then((res) => handleResponse(res))
            .catch((err: request.ResponseError) => handleResponse(err));
    }
}
