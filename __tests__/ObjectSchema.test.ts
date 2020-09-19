import { object, string, number, boolean } from '../src';

// TODO: Add test for messages
// TODO: Add not required tests

interface Person {
  name: string;
  email?: string;
  age: number;
  isBrazilian: boolean;
}

describe('String Schema API', () => {
  // TODO: add cast tests
  it('should cast the given values', () => {
    const schema = object<Person>().shape({
      name: string().required(),
      email: string().email(),
      age: number().required(),
      isBrazilian: boolean().required(),
    });

    const str = schema.cast('hello');
    expect(str).toBe('hello');

    const num = schema.cast(5);
    expect(num).toBe(5);

    const bool = schema.cast(true);
    expect(bool).toBe(true);

    const nil = schema.cast(null);
    expect(nil).toBeNull();

    const undef = schema.cast(undefined);
    expect(undef).toBeUndefined();

    // const obj = schema.cast({
    //   hello: 'string',
    // });
    // expect(obj).toStrictEqual({
    //   name: '',
    //   email: '',
    //   age: 0,
    //   isBrazilian: false,
    // });

    // const obj2 = schema.cast({
    //   name: 'hello',
    //   email: 'b@g.com',
    //   age: 17,
    //   isBrazilian: true,
    // });
    // expect(obj2).toStrictEqual({
    //   name: 'hello',
    //   email: 'b@g.com',
    //   age: 17,
    //   isBrazilian: true,
    // });
  });

  it('should cast nested values', () => {
    const schema = object().shape({
      name: string().required(),
      age: number().required(),
      isBrazilian: boolean().required(),
    });

    const casted = schema.cast({
      name: 'Gustavo',
      age: '17',
      isBrazilian: ['hello'],
    });

    expect(casted).toStrictEqual({
      name: 'Gustavo',
      age: 17,
      isBrazilian: true,
    });
  });

  it('should validate an object', async () => {
    const schema = object<Person>().shape({
      name: string().required(),
      age: number().required(),
      isBrazilian: boolean().required(),
      email: string().email(),
    });

    const [invalid, errors] = await schema.validate({
      name: null,
      age: 17,
      isBrazilian: true,
      email: '',
    });

    expect(invalid).toBe(false);
    expect(errors).not.toHaveLength(0);

    const [valid, errors2] = await schema.validate({
      name: 'Gustavo',
      age: 17,
      isBrazilian: true,
      email: 'test@gmail.com',
    });

    expect(valid).toBe(true);
    expect(errors2).toHaveLength(0);
  });
});
