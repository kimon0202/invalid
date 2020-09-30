# Array Schema

Creating an array schema is really easy:

```ts
import { array } from '@bauke2112/invalidjs';

const schema = array<string>(); // Inside the brackets we have the type if the array
```

In addition to its specific methods, it accepts all [`mixed`](https://github.com/kimon0202/invalid/blob/master/.github/docs/Mixed.md) methods.

Available methods:

  - [`.min(min: number, mesage?: string): ArraySchema<SchemaType>`](#minmin-number-message-string-arrayschemaschematype)
  - [`.max(max: number, mesage?: string): ArraySchema<SchemaType>`](#maxmax-number-message-string-arrayschemaschematype)
  - [`.length(value: number, mesage?: string): ArraySchema<SchemaType>`](#lengthvalue-number-message-string-arrayschemaschematype)

## API

### `.min(min: number, mesage?: string): ArraySchema<SchemaType>`

  Sets a minimum length for an array.

### `.max(max: number, mesage?: string): ArraySchema<SchemaType>`

  Sets a maximum length for an array.

### `.length(value: number, mesage?: string): ArraySchema<SchemaType>`

  Sets an exact length for an array.
