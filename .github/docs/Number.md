# Number Schema

Creating a number schema is really easy:

```ts
import { number } from '@bauke2112/invalidjs';

const schema = number();
```

In addition to its specific methods, it accepts all [`mixed`](https://github.com/kimon0202/invalid/blob/master/.github/docs/Mixed.md) methods.

Available methods:

  - [`.required(message?: string): NumberSchema`](#required)
  - [`.min(min: number, message?: string): NumberSchema`](#min)
  - [`.max(max: number, message?: string): NumberSchema`](#max)
  - [`.lessThan(less: number, message?: string): NumberSchema`](#lessThan)
  - [`.greaterThan(greater: number, message?: string): NumberSchema`](#greaterThan)
  - [`.positive(message?: string): NumberSchema`](#positive)
  - [`.negative(message?: string): NumberSchema`](#negative)
  - [`.integer(message?: string): NumberSchema`](#integer)

---
## API

### `.required(message?: string): NumberSchema` {#required}

  Ensures a number is not `null` or `undefined`. Any oyher values are accepted.

### `.min(min: number, message?: string): NumberSchema` {#min}

  Sets a minimum value for the number.

### `.max(max: number, message?: string): NumberSchema` {#max}

  Sets a maximum value for the number.

### `.lessThan(less: number, message?: string): NumberSchema` {#lessThan}

  Ensures that a value is less than an arbitrary number.

### `.greaterThan(greater: number, message?: string): NumberSchema` {#greaterThan}

  Ensures that a value is greater than an arbitrary number.

### `.positive(message?: string): NumberSchema` {#positive}

  Ensures that a value is a positive number.

### `.negative(message?: string): NumberSchema` {#negative}

  Ensures that a value is a negative number.

### `.integer(message?: string): NumberSchema` {#integer}

  Ensures that a value is an integer number.
