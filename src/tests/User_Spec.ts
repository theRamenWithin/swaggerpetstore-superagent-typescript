import waitUntil from "async-wait-until";
import { expect } from "chai";
import { ApiResponse, User } from "src/model/data/interfaces";
import { ExpectedBasic, ExpectedUser } from "src/tests/data/expected";
import { SetUser } from "src/tests/data/setters";
import { GetUser } from "src/tests/data/getters";

context(`${process.env.BASE_URL}/user`, () => {
    const timeout: number = (process.env.TIMEOUT as unknown as number) || 20000;
    const intervalBetweenAttempts: number =
        (process.env.TIMEOUT_INTERVAL as unknown as number) || 1000;

    describe("POST /createWithList", () => {
        let users: User[];

        afterEach(() =>
            users.forEach(async (user) => {
                await SetUser.delete(user.username);
            })
        );

        it("should create users with default data", async () => {
            users = [ExpectedUser.defaultUser()];
            const data = (await SetUser.createWithList(users)) as ApiResponse;
            const expectedData = ExpectedBasic.response("ok");

            expect(data).to.eql(expectedData);
        });

        it("should create users with faker data", async () => {
            users = [ExpectedUser.randomUser()];
            const data = (await SetUser.createWithList(users)) as ApiResponse;
            const expectedData = ExpectedBasic.response("ok");

            expect(data).to.eql(expectedData);
        });
    });

    describe("GET /{username}", () => {
        const user: User = ExpectedUser.randomUser();

        before(async () => await SetUser.create(user));
        after(async () => await SetUser.delete(user.username));

        it("should get a user by username", async () => {
            let data!: User;
            const expectedData = user;

            await waitUntil(
                async () => {
                    data = (await GetUser.getByUsername(
                        expectedData.username
                    )) as User;
                    return data.id === expectedData.id;
                },
                { timeout, intervalBetweenAttempts }
            );

            expect(data).to.eql(expectedData);
        });
    });

    describe("PUT /{username}", () => {
        const user: User = ExpectedUser.randomUser();

        before(async () => await SetUser.create(user));
        after(async () => await SetUser.delete(user.username));

        it("should update an existing user", async () => {
            let data!: ApiResponse;
            const expectedData: ApiResponse = ExpectedBasic.response(user.id);

            await waitUntil(
                async () => {
                    data = (await SetUser.update(
                        user.username,
                        user
                    )) as ApiResponse;
                    return data.code === 200;
                },
                { timeout, intervalBetweenAttempts }
            );

            expect(data).to.eql(expectedData);
        });
    });

    describe("DELETE /{username}", () => {
        const user: User = ExpectedUser.randomUser();

        before(async () => await SetUser.create(user));
        after(async () => await SetUser.delete(user.username));

        it("should delete an existing user", async () => {
            let data!: ApiResponse;
            const expectedData: ApiResponse = ExpectedBasic.response(
                user.username
            );

            await waitUntil(
                async () => {
                    data = (await SetUser.delete(user.username)) as ApiResponse;
                    return data.code === 200;
                },
                { timeout, intervalBetweenAttempts }
            );

            expect(data).to.eql(expectedData);
        });
    });

    describe("GET /login", () => {
        it("should login", async () => {
            const data = (await GetUser.login(
                "string",
                "string"
            )) as ApiResponse;
            const expectedData = ExpectedBasic.response(
                "logged in user session:"
            );

            expect(data.code).to.equal(expectedData.code);
            expect(data.type).to.equal(expectedData.type);
            expect(data.message).to.contain(expectedData.message);
        });
    });

    describe("GET /logout", () => {
        it("should logout", async () => {
            const data = (await GetUser.logout()) as ApiResponse;
            const expectedData = ExpectedBasic.response("ok");

            expect(data).to.eql(expectedData);
        });
    });

    describe("POST /createWithArray", () => {
        let users: User[];

        afterEach(() =>
            users.forEach(async (user) => {
                await SetUser.delete(user.username);
            })
        );

        it("should create users with default data", async () => {
            users = [ExpectedUser.defaultUser()];
            const data = (await SetUser.createWithArray(users)) as ApiResponse;
            const expectedData = ExpectedBasic.response("ok");

            expect(data).to.eql(expectedData);
        });

        it("should create users with faker data", async () => {
            users = [ExpectedUser.randomUser()];
            const data = (await SetUser.createWithArray(users)) as ApiResponse;
            const expectedData = ExpectedBasic.response("ok");

            expect(data).to.eql(expectedData);
        });

        afterEach(async () => await SetUser.delete(users[0].username));
    });

    describe("POST", () => {
        let user: User;

        afterEach(async () => await SetUser.delete(user.username));

        it("should create a user with default data", async () => {
            user = ExpectedUser.defaultUser();
            const data = await SetUser.create(user);
            const expectedData = ExpectedBasic.response(data.message as string);

            expect(data.message)
                .to.be.a("string")
                .of.length.greaterThanOrEqual(12);
            expect(data).to.eql(expectedData);
        });

        it("should create a user with faker data", async () => {
            user = ExpectedUser.randomUser();
            const data = await SetUser.create(user);
            const expectedData = ExpectedBasic.response(user.id);

            expect(data).to.eql(expectedData);
        });
    });
});
