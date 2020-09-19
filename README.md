# Invalid-JS

Ivalid-JS is a Typescript-first schema validation library.

It is inspired by other validation libraries like [Yup](https://github.com/jquense/yup#readme) and [Joi](https://github.com/sideway/joi#readme). Ivalid-JS tries to solve some problems regarding code duplication in such libraries, while exposing a simple and familiar function chaining API.

With Invalid-JS, it is also possible to create custom schemas and custom validation logic really easily.

* [Installation Guide](#installation)
* [Usage](#usage)
* [API](#api)

## Installation
To install Invalid-JS you can use one of the following commands, depending on the package manager you are using:

```bash
npm i @bauke2112/invalidjs --save
```

```bash
yarn add @bauke2112/invalidjs
```

## Usage

Invalid-JS defines some function for creating schemas:

```ts
import { string, number, boolean, object } from '@bauke2112/invalidjs';

// Defining the schema
const schema = object().shape({
	name: string().required(),
	age: number().required(),
	isBrazilian: boolean().required(),
});

// Validating the schema
const [isValid, errors] = await schema.validate({
	name: 'Gustavo',
	age: 17,
	isBrazilian: true,
});
```

## API

 - [`ValidationError`](https://github.com/kimon0202/invalid/blob/master/.github/docs/ValidationError.md)
 - [`mixed`](https://github.com/kimon0202/invalid/blob/master/.github/docs/Mixed.md)
 - [`string`](https://github.com/kimon0202/invalid/blob/master/.github/docs/String.md)
 - [`number`](https://github.com/kimon0202/invalid/blob/master/.github/docs/Number.md)
 - [`boolean`](https://github.com/kimon0202/invalid/blob/master/.github/docs/Boolean.md)
 - [`object`](https://github.com/kimon0202/invalid/blob/master/.github/docs/Object.md)

<!---
  Add guides for creatingc custom schemas.
->
