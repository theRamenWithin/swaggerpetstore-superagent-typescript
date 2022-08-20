/* eslint-disable max-len */
import request from "superagent";
import { handleResponse } from "src/tests/data/helpers";
import { ApiResponse, Order } from "src/model/data/interfaces";

const agent = request.agent();
const url = `${process.env.BASE_URL}/store`;

export class SetStore {
    /**
     * Place an order for a pet
     * @param order order placed for purchasing the pet
     */
    static async createOrder(order: Order): Promise<Order | ApiResponse> {
        return await agent
            .post(`${url}/order`)
            .accept("json")
            .type("json")
            .send(order)
            .then((res) => handleResponse<Order>(res))
            .catch((err: request.ResponseError) => handleResponse(err));
    }

    /**
     * Delete purchase order by ID
     * @description For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
     * @param orderId ID of the order that needs to be deleted
     */
    static async deleteOrder(orderId: number): Promise<ApiResponse> {
        return await agent
            .delete(`${url}/order/${orderId}`)
            .accept("json")
            .then((res) => handleResponse(res))
            .catch((err: request.ResponseError) => handleResponse(err));
    }
}
