# Object Schema

Creating an object schema is really easy:

```ts
import { object } from '@bauke2112/invalidjs';

const schema = object();
```

In addition to its specific methods, it accepts all [`mixed`](https://github.com/kimon0202/invalid/blob/master/.github/docs/Mixed.md) methods.

Available methods:

  - [`.required(message?: string): ObjectSchema<ObjectType>`](#requiredmessage-string-objectschemaobjecttype)
  - [`.shape(shape: object): ObjectSchema<ObjectType>`](#shapeshape-object-objectschemaobjecttype)

---
## API

### `.required(message?: string): ObjectSchema<ObjectType>`

  Ensures an object is not `null` or `undefined`. Any oyher values are accepted.

### `.shape(shape: object): ObjectSchema<ObjectType>`

  Defines the keys of an object and the schemas for said keys.

```ts
const schema = object().shape({
  a: string(),
  b: number(),
  c: boolean(),
  d: object().shape({
    // ...
  })
});
```
