import { errors, string } from '../../src';

describe('Errors Function', () => {
  const schema = string()
    .min(5)
    .max(15)
    .regex(/[a-z0-9]/);

  it('should return an array of errors', async () => {
    const validationErrors = await errors(schema, 4);

    expect(validationErrors).not.toHaveLength(0);
    // console.log(validationErrors.map(err => err.message));
  });

  it('should not return errors', async () => {
    const validationErrors = await errors(schema, 'this is valid');
    expect(validationErrors).toHaveLength(0);
  });
});
