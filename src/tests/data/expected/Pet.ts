import faker from "faker";
import { PetStatus } from "src/model/data/enum/Status";
import { ApiResponse, Pet } from "src/model/data/interfaces";

export class ExpectedPet {
    static defaultPet(): Pet {
        return {
            id: 0,
            category: {
                id: 0,
                name: "string",
            },
            name: "doggie",
            photoUrls: ["string"],
            tags: [
                {
                    id: 0,
                    name: "string",
                },
            ],
            status: PetStatus[PetStatus.available],
        };
    }

    static randomPet(): Pet {
        return {
            id: faker.datatype.number({ min: 1000, max: 1000000 }),
            category: {
                id: faker.datatype.number({ min: 1000, max: 10000 }),
                name: faker.name.jobType(),
            },
            name: faker.animal.dog(),
            photoUrls: [faker.image.imageUrl()],
            tags: [
                {
                    id: faker.datatype.number({ min: 1000, max: 10000 }),
                    name: faker.animal.type(),
                },
            ],
            status: PetStatus[faker.datatype.number(2)],
        };
    }

    static uploadImage(
        imageSize: number,
        additionalMetadata = "null"
    ): ApiResponse {
        return {
            code: 200,
            type: "unknown",
            message: `additionalMetadata: ${additionalMetadata}\nFile uploaded to ./media.jpg, ${imageSize} bytes`,
        };
    }

    static update(pet: Pet): Pet {
        return {
            id: pet.id,
            photoUrls: [],
            tags: [],
        };
    }
}
