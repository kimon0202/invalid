# Mixed Schema

Creating a mixed (any) schema is really easy:

```ts
import { any } from '@bauke2112/invalidjs';

const schema = any();
```

An any schema accepts any value.

Available methods:

  - [`.required(message?: string): AnySchema`](#requiredmessage-string-anyschema)
  - [`.notRequired(allowNull: boolean, message?: string): AnySchema`](#notrequiredallownull-boolean-message-string-anyschema)

---

## API

### `.required(message?: string): AnySchema`

  Ensures a value is not `null` or `undefined`. Any oyher values are accepted.

### `.notRequired(allowNull: boolean, message?: string): AnySchema`

  Marks a schema as not required. If `allowNull` is true, the values `null` and `undefined` will not fail the test. If false, only `null` will fail.
