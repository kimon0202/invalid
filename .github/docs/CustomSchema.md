# Custom Schemas

InvalidJS allows you to create your custom schemas, with custom validation logic. Creating a custom schema is really easy:

```ts
import { Schema, IValidationOptions, IValidationResult, ValidationError } from '@bauke2112/invalidjs';

export class LogicalSchema extends Schema<boolean> {
  public constructor() {
    super('This must be true');
  }

  public async validate(
    value: any,
    options: IValidationOptions = { path: '' },
  ): Promise<IValidationResult> {
    options = {
      ...options,
      path: '',
    };

    return this._validate(value, options);
  }

  public validateSync(
    value: any,
    options: IValidationOptions = { path: '' },
  ): IValidationResult {
    options = {
      ...options,
      path: '',
    };

    return this._validate(value, options);
  }

  public cast(value: any): any {
    return !!value;
  }

  private _validate(value: any, options: IValidationOptions): IValidationResult {
    const errors: ValidationError[] = [];

    this._properties.forEach(prop => {
      const context: IValidationContext = {
        property: prop,
        path: options.path || '',
      };

      const [, error] = prop.test(value, context);
      if (error) errors.push(error);
    });

    return [errors.length === 0, errors];
  }
}

// This part is not mandatory, but it makes the API look better
export const logical = (): LogicalSchema => new LogicalSchema();
```

The example above creates a logical schema. The methods `validate`, `validateSync` and `cast` must be provided for all custom schemas. The constructor is optional. However, when not provided an error string must be passed as a parameter when creating a new instance of the schema.

## Properties exposed by the `Schema<Type>` class

The schema class provide some useful properties:

  * [`this._properties`](#this-properties)

### `this._properties`

This property holds all the properties a schema has. (See [What are properties?](#properties) for further information).

## Properties

A property is some testable characteristic a schema has (e.g.: length, min, max, email,...).
Every property must have a name and a test function with the following signature: `test(value: any, context: IValidationContext): ITestResult`. The `value` and `context` properties are passed while validating.

<!-- (See [`Advanced Schemas Guide`](http://github.com/kimon0202/invalid/blob/master/.github/docs/AdvancedSchemas.md)). -->

The `ITestResult` type is equal to: `[boolean, ValidationError]`.

Creating a property is simple:

```ts
import { IProperty } from '@bauke2112/invalidjs';

export const truthFactory = (message?: string): IProperty => ({
  name: 'truth',
  test: (value, context) => {
    const isValid = !!value;
    const error = isValid ? null : new ValidationError('This must be true', context.path || '');

    return [isValid, error];
  },
});
```

Using the schema created above, you can add property to the schema:

```ts
export class LogicalSchema extends Schema<boolean> {
  // ... other stuff

  public truth(message?: string): LogicalSchema {
    this._properties.add(truthFactory(message));
    return this;
  }
}
```
