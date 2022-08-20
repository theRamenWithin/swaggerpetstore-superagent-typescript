import request from "superagent";
import { handleResponse } from "src/tests/data/helpers";
import { Inventory, ApiResponse, Order } from "src/model/data/interfaces";

const agent = request.agent();
const url = `${process.env.BASE_URL}/store`;

export class GetStore {
    /**
     * Returns pet inventories by status
     * @description Returns a map of status codes to quantities
     */
    static async getInventory(): Promise<Inventory | ApiResponse> {
        return await agent
            .get(`${url}/inventory`)
            .type("json")
            .then((res) => handleResponse<Inventory>(res))
            .catch((err: request.ResponseError) => handleResponse(err));
    }

    /**
     * Find purchase order by ID
     * @description For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
     * @param orderId ID of pet that needs to be fetched
     */
    static async getOrderById(orderId: number): Promise<Order | ApiResponse> {
        return await agent
            .get(`${url}/order/${orderId}`)
            .accept("json")
            .then((res) => handleResponse<Order>(res))
            .catch((err: request.ResponseError) => handleResponse(err));
    }
}
