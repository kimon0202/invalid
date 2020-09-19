# String Schema

Creating a string schema is really easy:

```ts
import { string } from '@bauke2112/invalidjs';

const schema = string();
```

In addition to its specific methods, it accepts all [`mixed`](https://github.com/kimon0202/invalid/blob/master/.github/docs/Mixed.md) methods.

Available methods:

  - [`.required(message?: string): StringSchema`](#required)
  - [`.min(min: number, message?: string): StringSchema`](#min)
  - [`.max(max: number, message?: string): StringSchema`](#max)
  - [`.matches(regex: RegExp, message?: string): StringSchema`](#matches)
  - [`.email(message?: string): StringSchema`](#email)
  - [`.uuid(message?: string): StringSchema`](#uuid)
  - [`.url(message?: string): StringSchema`](#url)

---
## API

### `.required(message?: string): StringSchema` {#required}

  Ensures a string is not `null` or `undefined`. Any oyher values are accepted.

### `.min(min: number, message?: string): StringSchema` {#min}

  Sets a minimum length for the string value.

### `.max(max: number, message?: string): StringSchema` {#max}

  Sets a maximum length for the string value.

### `.matches(regex: RegExp, message?: string): StringSchema` {#matches}

  Matches the value against the given regex.

  ```ts
  const schema = string().matches(/(today|yesterday)/);

  await schema.validate('today') // => true
  await schema.validate('morning') // => false
  ```

### `.email(message?: string): StringSchema` {#email}

  Ensures the value is a valid email address.

### `.uuid(message?: string): StringSchema` {#uuid}

  Ensures the value is a valid UUID.

## `.url(message?: string): StringSchema` {#url}

  Ensures the value is a valid URL address.
