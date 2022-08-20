# [SwaggerPetStore](https://petstore.swagger.io/) - Superagent

## Overview

**This project was made while employeed by [Planit Testing](https://www.planittesting.com) and I have been given permission to share it on my personal Github account.**

This project serves as an example of how to implement [Mocha](https://mochajs.org/) tests with [Chai](https://www.chaijs.com/) assertions using [Superagent](https://visionmedia.github.io/superagent/) with [TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html) to test an API in an automated fashion.

>Why Superagent? I can make HTTP requests with the testing framework I'm using.

The built in HTTP methods of your framework are often lacklustre with minimal features and an odd syntax. Superagent solves this with detailed response objects, a highly readable syntax and excellent documentation.

>Why TypeScript?

TypeScript allows us to be very explicit in declaring what data we expect to receive as a response to an API call. The same API may return entirely different JSON/XML objects based on what input is provided. In the following example, we know that this GET request will either return a `Pet` object on a successful call or will return a generic `ApiResponse` object if there is an error.

```ts
static async getById(petId: number): Promise<Pet | ApiResponse> {
    return await agent
        .get(`${url}/${petId}`)
        .accept('json')
        .then((res) => handleResponse<Pet>(res))
        .catch((err: request.ResponseError) => handleResponse(err))
}
```

>What is this .env file?

**This file is not normally checked into your repository and should be included in the `.gitignore`. In production, you should expect to configure and store environment variables securely in your CI/CD pipeline.** The `.env` is used by the npm package [dotenv](https://www.npmjs.com/package/dotenv) to declare environment variables for your local environment, accessible as a property on `process.env`, allowing you to quickly change them during the development and testing process.

```dotenv
TIMEOUT=30000
TIMEOUT_INTERVAL=1000
BASE_URL=https://petstore.swagger.io/v2
```

In the code, I have used the `TIMEOUT` value to set timeout options for `awaitUntil()` functions. During testing, I may find the timeout value I have set is too low, resulting in unexpected failures. Instead of changing the value in each function, I can change the environment variable in one location and run my tests again. In production, you can expect to have a long list of env vars that you may wish to change and configure in individual test runs.

> What is faker?

[faker](https://www.npmjs.com/package/faker) is an npm package we use to randomly generate different kinds of data for use in our automated tests. If we hard code our inputs, we limit our ability to catch defects that can arise through combinations of different inputs. In the following example, to test an API that creates a new order, I have a method that returns the object I need to pass to the API containing random data within expected parameters.

```ts
static randomOrder(): Order {
    return {
        id: faker.datatype.number({ min: 1000, max: 1000000 }),
        petId: faker.datatype.number({ min: 1000, max: 1000000 }),
        quantity: faker.datatype.number(5),
        shipDate: new Date().toJSON().replace('Z', '+0000'),
        status: OrderStatus[faker.datatype.number(2)],
        complete: faker.datatype.boolean()
    }
}
```

## Usage

### Install

`npm install`

### Execute

`npm run tests`

### Debug

Refer to `.vscode/launch.json`. You have the option to debug the current file or to debug all test files.

## Todo

1. Implement a main file that declares various variables that can be imported into multiple files, instead of declaring them over and over again, to make code more DRY. Weigh this with making code readable.
1. Tests for all the API errors
