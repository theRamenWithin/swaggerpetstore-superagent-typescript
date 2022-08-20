import faker from "faker";
import { OrderStatus } from "src/model/data/enum";
import { Order } from "src/model/data/interfaces";

export class ExpectedStore {
    static defaultOrder(): Order {
        return {
            id: 0,
            petId: 0,
            quantity: 0,
            shipDate: new Date().toJSON().replace("Z", "+0000"),
            status: OrderStatus[OrderStatus.placed],
            complete: true,
        };
    }

    static randomOrder(): Order {
        return {
            id: faker.datatype.number({ min: 1000, max: 1000000 }),
            petId: faker.datatype.number({ min: 1000, max: 1000000 }),
            quantity: faker.datatype.number(5),
            shipDate: new Date().toJSON().replace("Z", "+0000"),
            status: OrderStatus[faker.datatype.number(2)],
            complete: faker.datatype.boolean(),
        };
    }
}
