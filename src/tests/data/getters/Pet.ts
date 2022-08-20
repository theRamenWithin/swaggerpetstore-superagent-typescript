import request from "superagent";
import { handleResponse } from "src/tests/data/helpers";
import { Pet, ApiResponse, Tag } from "src/model/data/interfaces";

const agent = request.agent();
const url = `${process.env.BASE_URL}/pet`;

export class GetPet {
    /**
     * Find Pets by status
     * @description Multiple status values can be provided with comma separated strings
     * @param status Status values that need to be considered for filter
     */
    static async getByStatus(status: string[]): Promise<Pet[] | ApiResponse> {
        return await agent
            .get(`${url}/findByStatus`)
            .query({ status })
            .accept("json")
            .then((res) => handleResponse<Pet[]>(res))
            .catch((err: request.ResponseError) => handleResponse(err));
    }

    /**
     * Find Pets by tags
     * @description Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing
     * @param tags Tags to filter by
     * @deprecated
     */
    static async getByTags(tags: Tag[]): Promise<Pet[] | ApiResponse> {
        return await agent
            .get(`${url}/findByTags`)
            .query({ tags })
            .accept("json")
            .then((res) => handleResponse<Pet[]>(res))
            .catch((err: request.ResponseError) => handleResponse(err));
    }

    /**
     * Find by by ID
     * @description Returns a single pet
     * @param petId ID of pet to return
     */
    static async getById(petId: number): Promise<Pet | ApiResponse> {
        return await agent
            .get(`${url}/${petId}`)
            .accept("json")
            .then((res) => handleResponse<Pet>(res))
            .catch((err: request.ResponseError) => handleResponse(err));
    }
}
