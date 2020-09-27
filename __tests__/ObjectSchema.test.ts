import { object, string, number, boolean } from '../src';

// TODO: Add test for messages
// TODO: Add not required tests

interface Person {
  name: string;
  email?: string;
  age: number;
  isBrazilian: boolean;
}

describe('Object Schema API', () => {
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

  it('should validate an object (sync)', () => {
    const schema = object<Person>().shape({
      name: string().required(),
      age: number().required(),
      isBrazilian: boolean().required(),
      email: string().email(),
    });

    const [invalid, errors] = schema.validateSync({
      name: null,
      age: 17,
      isBrazilian: true,
      email: '',
    });

    expect(invalid).toBe(false);
    expect(errors).not.toHaveLength(0);

    const [valid, errors2] = schema.validateSync({
      name: 'Gustavo',
      age: 17,
      isBrazilian: true,
      email: 'test@gmail.com',
    });

    expect(valid).toBe(true);
    expect(errors2).toHaveLength(0);
  });

  describe('Error paths', () => {
    it('should return errors with a path property', async () => {
      const schema = object().shape({
        name: string().required(),
        email: string().email(),
        url: string().url(),
        age: number().positive(),
        profile: object().shape({
          bio: string().min(120),
        }),
      });

      const [, errors] = await schema.validate({
        name: undefined,
        email: 'test.com',
        url: 'hello.br',
        age: -18,
        profile: {
          bio: 'not 120 chars',
        },
      });

      const paths = errors.map(error => error.path);
      expect(errors).toHaveLength(5);

      paths.forEach(path => {
        expect(path).toBeDefined();
      });
    });

    it('should return erros with errors path property when options is dclared', async () => {
      const schema = object().shape({
        name: string().required(),
        email: string().email(),
        url: string().url(),
        age: number().positive(),
        profile: object().shape({
          bio: string().min(120),
        }),
      });

      const [, errors] = await schema.validate(
        {
          name: undefined,
          email: 'test.com',
          url: 'hello.br',
          age: -18,
          profile: {
            bio: 'not 120 chars',
          },
        },
        {},
      );

      const paths = errors.map(error => error.path);
      expect(errors).toHaveLength(5);

      paths.forEach(path => {
        expect(path).toBeDefined();
      });
    });
  });
});
