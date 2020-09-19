# Number Schema

Creating a number schema is really easy:

```ts
import { number } from '@bauke2112/invalidjs';

const schema = number();
```

In addition to its specific methods, it accepts all [`mixed`](https://github.com/kimon0202/invalid/blob/master/.github/docs/Mixed.md) methods.

Available methods:

  - [`.required(message?: string): NumberSchema`](#requiredmessage-string-numberschema-required)
  - [`.min(min: number, message?: string): NumberSchema`](#minmin-number-message-string-numberschema-min)
  - [`.max(max: number, message?: string): NumberSchema`](#maxmax-number-message-string-numberschema-max)
  - [`.lessThan(less: number, message?: string): NumberSchema`](#lessthanless-number-message-string-numberschema-lessthan)
  - [`.greaterThan(greater: number, message?: string): NumberSchema`](#greaterthangreater-number-message-string-numberschema-greaterthan)
  - [`.positive(message?: string): NumberSchema`](#positivemessage-string-numberschema-positive)
  - [`.negative(message?: string): NumberSchema`](#negativemessage-string-numberschema-negative)
  - [`.integer(message?: string): NumberSchema`](#integermessage-string-numberschema-integer)

---
## API

### `.required(message?: string): NumberSchema`

  Ensures a number is not `null` or `undefined`. Any oyher values are accepted.

### `.min(min: number, message?: string): NumberSchema`

  Sets a minimum value for the number.

### `.max(max: number, message?: string): NumberSchema`

  Sets a maximum value for the number.

### `.lessThan(less: number, message?: string): NumberSchema`

  Ensures that a value is less than an arbitrary number.

### `.greaterThan(greater: number, message?: string): NumberSchema`

  Ensures that a value is greater than an arbitrary number.

### `.positive(message?: string): NumberSchema`

  Ensures that a value is a positive number.

### `.negative(message?: string): NumberSchema`

  Ensures that a value is a negative number.

### `.integer(message?: string): NumberSchema`

  Ensures that a value is an integer number.
