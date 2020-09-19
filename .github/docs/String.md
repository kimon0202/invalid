# String Schema

Creating a string schema is really easy:

```ts
import { string } from '@bauke2112/invalidjs';

const schema = string();
```

In addition to its specific methods, it accepts all [`mixed`](https://github.com/kimon0202/invalid/blob/master/.github/docs/Mixed.md) methods.

Available methods:

  - [`.required(message?: string): StringSchema`](#requiredmessage-string-stringschema-required)
  - [`.min(min: number, message?: string): StringSchema`](#minmin-number-message-string-stringschema-min)
  - [`.max(max: number, message?: string): StringSchema`](#maxmax-number-message-string-stringschema-max)
  - [`.matches(regex: RegExp, message?: string): StringSchema`](#matchesregex-regexp-message-string-stringschema-matches)
  - [`.email(message?: string): StringSchema`](#emailmessage-string-stringschema-email)
  - [`.uuid(message?: string): StringSchema`](#uuidmessage-string-stringschema-uuid)
  - [`.url(message?: string): StringSchema`](#urlmessage-string-stringschema-url)

---
## API

### `.required(message?: string): StringSchema`

  Ensures a string is not `null` or `undefined`. Any oyher values are accepted.

### `.min(min: number, message?: string): StringSchema`

  Sets a minimum length for the string value.

### `.max(max: number, message?: string): StringSchema`

  Sets a maximum length for the string value.

### `.matches(regex: RegExp, message?: string): StringSchema`

  Matches the value against the given regex.

  ```ts
  const schema = string().matches(/(today|yesterday)/);

  await schema.validate('today') // => true
  await schema.validate('morning') // => false
  ```

### `.email(message?: string): StringSchema`

  Ensures the value is a valid email address.

### `.uuid(message?: string): StringSchema`

  Ensures the value is a valid UUID.

### `.url(message?: string): StringSchema`

  Ensures the value is a valid URL address.
