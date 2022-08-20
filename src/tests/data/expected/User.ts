import faker from "faker";
import { User } from "src/model/data/interfaces";

export class ExpectedUser {
    static defaultUser(): User {
        return {
            id: 0,
            username: "string",
            firstName: "string",
            lastName: "string",
            email: "string",
            password: "string",
            phone: "string",
            userStatus: 0,
        };
    }

    static randomUser(): User {
        return {
            id: faker.datatype.number({ min: 1000, max: 1000000 }),
            username: faker.internet.userName(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            phone: faker.phone.phoneNumber(),
            userStatus: faker.datatype.number(10),
        };
    }
}
