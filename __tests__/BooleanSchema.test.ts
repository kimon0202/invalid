import { boolean } from '../src';

describe('Boolean Schema API', () => {
  it('should cast the given values (async)', async () => {
    const schema = boolean();

    const bool = await schema.cast(true);
    expect(bool).toBe(true);

    const notTrue = await schema.cast(false);
    expect(notTrue).toBe(false);

    const emptyString = await schema.cast('');
    expect(emptyString).toBe(false);

    const emptyArray = await schema.cast([]);
    expect(emptyArray).toBe(true);

    const emptyObject = await schema.cast({});
    expect(emptyObject).toBe(true);

    const zero = await schema.cast(0);
    expect(zero).toBe(false);

    const notZero = await schema.cast(9481);
    expect(notZero).toBe(true);

    const negative = await schema.cast(-89028);
    expect(negative).toBe(true);

    const string = await schema.cast('not empty');
    expect(string).toBe(true);

    const array = await schema.cast([9, 0.4]);
    expect(array).toBe(true);

    const object = await schema.cast({ hello: 'world' });
    expect(object).toBe(true);

    const undef = await schema.cast(undefined);
    expect(undef).toBe(false);

    const nil = await schema.cast(null);
    expect(nil).toBe(false);
  });

  it('should cast the given values (sync)', () => {
    const schema = boolean();

    const bool = schema.castSync(true);
    expect(bool).toBe(true);

    const notTrue = schema.castSync(false);
    expect(notTrue).toBe(false);

    const emptyString = schema.castSync('');
    expect(emptyString).toBe(false);

    const emptyArray = schema.castSync([]);
    expect(emptyArray).toBe(true);

    const emptyObject = schema.castSync({});
    expect(emptyObject).toBe(true);

    const zero = schema.castSync(0);
    expect(zero).toBe(false);

    const notZero = schema.castSync(9481);
    expect(notZero).toBe(true);

    const negative = schema.castSync(-89028);
    expect(negative).toBe(true);

    const string = schema.castSync('not empty');
    expect(string).toBe(true);

    const array = schema.castSync([9, 0.4]);
    expect(array).toBe(true);

    const object = schema.castSync({ hello: 'world' });
    expect(object).toBe(true);

    const undef = schema.castSync(undefined);
    expect(undef).toBe(false);

    const nil = schema.castSync(null);
    expect(nil).toBe(false);
  });
});
