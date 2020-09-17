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
