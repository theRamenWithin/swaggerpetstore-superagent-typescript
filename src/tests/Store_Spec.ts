import waitUntil from "async-wait-until";
import { expect } from "chai";
import { ApiResponse, Inventory, Order } from "src/model/data/interfaces";
import { ExpectedBasic, ExpectedStore } from "src/tests/data/expected";
import { SetStore } from "src/tests/data/setters";
import { GetStore } from "src/tests/data/getters";
import { PetStatus } from "src/model/data/enum";

context(`${process.env.BASE_URL}/store`, () => {
    const timeout: number = (process.env.TIMEOUT as unknown as number) || 20000;
    const intervalBetweenAttempts: number =
        (process.env.TIMEOUT_INTERVAL as unknown as number) || 1000;

    describe("GET /inventory", () => {
        it("should get tally of orders by pet status code", async () => {
            const data = (await GetStore.getInventory()) as Inventory;
            const expectedData = Object.keys(PetStatus).filter((status) =>
                isNaN(status as unknown as number)
            );

            expect(data).to.include.keys(expectedData);
            expectedData.forEach((status: string) => {
                expect(data[status]).to.be.greaterThan(0);
            });
        });
    });

    describe("POST /order", () => {
        let expectedData: Order;

        afterEach(async () => await SetStore.deleteOrder(expectedData.id));

        it("should create an order with default data", async () => {
            expectedData = ExpectedStore.defaultOrder();
            const data = (await SetStore.createOrder(expectedData)) as Order;
            expectedData.id = data.id;

            expect(data).to.eql(expectedData);
        });

        it("should create an order with faker data", async () => {
            expectedData = ExpectedStore.randomOrder();
            const data = (await SetStore.createOrder(expectedData)) as Order;

            expect(data).to.eql(expectedData);
        });
    });

    describe("GET /order/{orderId}", () => {
        const order = ExpectedStore.randomOrder();

        before(async () => await SetStore.createOrder(order));
        after(async () => await SetStore.deleteOrder(order.id));

        it("should get an order by Id", async () => {
            let data!: Order;
            const expectedData = order;

            await waitUntil(
                async () => {
                    data = (await GetStore.getOrderById(order.id)) as Order;
                    return data.id === order.id;
                },
                { timeout, intervalBetweenAttempts }
            );

            expect(data).to.eql(expectedData);
        });
    });

    describe("DELETE /order/{orderId}", () => {
        const order = ExpectedStore.randomOrder();

        before(async () => await SetStore.createOrder(order));

        it("should delete an order by Id", async () => {
            let data!: ApiResponse;
            const expectedData = ExpectedBasic.response(order.id);

            await waitUntil(
                async () => {
                    data = (await SetStore.deleteOrder(
                        order.id
                    )) as ApiResponse;
                    return data.code === 200;
                },
                { timeout, intervalBetweenAttempts }
            );

            expect(data).to.eql(expectedData);
        });
    });
});
