import request from "superagent";
import { handleResponse } from "src/tests/data/helpers";
import { Pet, ApiResponse } from "src/model/data/interfaces";

const agent = request.agent();
const url = `${process.env.BASE_URL}/pet`;

export class SetPet {
    /**
     * Adds a new pet to the store
     * @param pet Pet object that needs to be added to the store
     */
    static async create(pet: Pet): Promise<Pet | ApiResponse> {
        return await agent
            .post(url)
            .type("json")
            .accept("json")
            .send(pet)
            .then((res) => handleResponse<Pet>(res))
            .catch((err: request.ResponseError) => handleResponse(err));
    }

    /**
     * uploads an image
     * @param id ID of pet to update
     * @param filePath file to upload
     * @param additionalMetadata Additional data to pass to server
     */
    static async uploadImage(
        id = 0,
        filePath: string,
        additionalMetadata = ""
    ): Promise<ApiResponse> {
        return await agent
            .post(`${url}/${id}/uploadImage`)
            .accept("json")
            .attach("file", filePath)
            .field("additionalMetadata", additionalMetadata)
            .then((res) => handleResponse(res))
            .catch((err: request.ResponseError) => handleResponse(err));
    }

    /**
     * Update an existing pet
     * @param pet Pet object that needs to be added to the store
     */
    static async update(pet: Pet): Promise<Pet | ApiResponse> {
        return await agent
            .put(url)
            .type("json")
            .accept("json")
            .send(pet)
            .then((res) => handleResponse<Pet>(res))
            .catch((err: request.ResponseError) => handleResponse(err));
    }

    /**
     * Updates a pet in the store with form data
     * @param petId ID of pet that needs to be updated
     * @param name Updated name of the pet
     * @param status Updated status of the pet
     */
    static async updateWithForm(
        petId: number,
        name?: string,
        status?: string
    ): Promise<ApiResponse> {
        return await agent
            .post(`${url}/${petId}`)
            .accept("json")
            .type("form")
            .send(name ? { name } : undefined)
            .send(status ? { status } : undefined)
            .then((res) => handleResponse(res))
            .catch((err: request.ResponseError) => handleResponse(err));
    }

    /**
     * Deletes a pet
     * @param petId Pet id to delete
     * @param api_key
     */
    static async delete(petId: number, api_key?: string): Promise<ApiResponse> {
        return await agent
            .delete(`${url}/${petId}`)
            .accept("json")
            .set(api_key ? { api_key } : {})
            .then((res) => handleResponse(res))
            .catch((err: request.ResponseError) => handleResponse(err));
    }
}
