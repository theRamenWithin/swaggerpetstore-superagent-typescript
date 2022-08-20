import faker from "faker";
import waitUntil from "async-wait-until";
import { expect } from "chai";
import { ApiResponse, Pet } from "src/model/data/interfaces";
import { ExpectedPet, ExpectedBasic } from "src/tests/data/expected";
import { SetPet } from "src/tests/data/setters";
import { GetFile, GetPet } from "src/tests/data/getters";
import { PetStatus } from "src/model/data/enum/Status";

context(`${process.env.BASE_URL}/pet`, () => {
    const timeout: number = (process.env.TIMEOUT as unknown as number) || 20000;
    const intervalBetweenAttempts: number =
        (process.env.TIMEOUT_INTERVAL as unknown as number) || 1000;

    describe("POST", () => {
        let expectedData: Pet;

        afterEach(async () => await SetPet.delete(expectedData.id));

        it("should create a pet with default data", async () => {
            expectedData = ExpectedPet.defaultPet();
            const data = (await SetPet.create(expectedData)) as Pet;

            expectedData.id = data.id;
            expect(data).to.eql(expectedData);
        });

        it("should create a pet with faker data", async () => {
            expectedData = ExpectedPet.randomPet();
            const data = (await SetPet.create(expectedData)) as Pet;

            expect(data).to.eql(expectedData);
        });
    });

    describe("POST /{petId}/uploadImage", () => {
        const pet = ExpectedPet.randomPet();
        const localPath = "src/assets/images/media.jpg";

        before(async () => await SetPet.create(pet));
        after(async () => {
            await SetPet.delete(pet.id);
            GetFile.deleteFile(localPath);
        });

        it("should upload a faker image for a pet", async () => {
            const filePath = faker.image.imageUrl();
            const fileSize = await GetFile.getFileSize(filePath, localPath);
            const additionalMetadata = faker.datatype.string();

            let data!: ApiResponse;
            const expectedData = ExpectedPet.uploadImage(
                fileSize,
                additionalMetadata
            );

            await waitUntil(
                async () => {
                    data = (await SetPet.uploadImage(
                        pet.id,
                        localPath,
                        additionalMetadata
                    )) as ApiResponse;
                    return data.code === 200;
                },
                { timeout, intervalBetweenAttempts }
            );

            expect(data).to.eql(expectedData);
        });
    });

    describe("PUT", () => {
        const pet = ExpectedPet.randomPet();

        before(async () => await SetPet.create(pet));
        after(async () => await SetPet.delete(pet.id));

        it("should update an existing pet", async () => {
            let data!: Pet;
            const expectedData = pet;

            await waitUntil(
                async () => {
                    data = (await SetPet.update(expectedData)) as Pet;
                    return data.id === pet.id;
                },
                { timeout, intervalBetweenAttempts }
            );

            expect(data).to.eql(expectedData);
        });
    });

    describe("GET /findByStatus", () => {
        const status = [PetStatus[faker.datatype.number(2)]];

        it("should get all pets by status", async () => {
            const data = (await GetPet.getByStatus(status)) as Pet[];

            expect(data).to.be.a("Array").of.length.greaterThan(0);
            data.forEach((pet) => expect(pet.status).to.be.oneOf(status));
        });
    });

    describe("GET /{petId}", () => {
        const pet = ExpectedPet.randomPet() as Pet;

        before(async () => await SetPet.create(pet));
        after(async () => await SetPet.delete(pet.id));

        it("should get an existing pet by Id", async () => {
            let data!: Pet;
            const expectedData = pet;

            await waitUntil(
                async () => {
                    data = (await GetPet.getById(pet.id)) as Pet;
                    return data.id === pet.id;
                },
                { timeout, intervalBetweenAttempts }
            );

            expect(data).to.eql(expectedData);
        });
    });

    describe("POST /{petId}", () => {
        const pet = ExpectedPet.randomPet() as Pet;

        before(async () => await SetPet.create(pet));
        after(async () => await SetPet.delete(pet.id));

        it("should update an existing pet with form data", async () => {
            let data!: ApiResponse;
            const expectedData = ExpectedBasic.response(pet.id);

            await waitUntil(
                async () => {
                    data = await SetPet.updateWithForm(
                        pet.id,
                        pet.name,
                        pet.status
                    );
                    return data.code === 200;
                },
                { timeout, intervalBetweenAttempts }
            );

            expect(data).to.eql(expectedData);
        });
    });

    describe("DELETE /{petId}", () => {
        const pet = ExpectedPet.randomPet();

        before(async () => await SetPet.create(pet));

        it("should delete an existing pet", async () => {
            let data!: ApiResponse;
            const expectedData = ExpectedBasic.response(pet.id);

            await waitUntil(
                async () => {
                    data = (await SetPet.delete(pet.id)) as ApiResponse;
                    return data.code === 200;
                },
                { timeout, intervalBetweenAttempts }
            );

            expect(data).to.eql(expectedData);
        });
    });
});
