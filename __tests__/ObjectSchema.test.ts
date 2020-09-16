import { object, string, number, boolean } from '../src';
import { ISchema } from '../src/schema/Schema';

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

  it('should shape an object', () => {
    const schema = object<Person>().shape({
      name: string().required(),
      age: number().required().positive(),
      isBrazilian: boolean().required(),
    });

    const schemaDef = schema.schema;
    expect(schemaDef).toStrictEqual({
      shape: {
        name: {
          required: true,
        },
        age: {
          required: true,
          greaterThan: true,
        },
        isBrazilian: {
          required: true,
        },
      },
    } as ISchema<Person>);
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
  });
});
