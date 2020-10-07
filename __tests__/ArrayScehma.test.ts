import { array } from '../src';

describe('Array Schema API', () => {
  it('should validate an array with min length schema', async () => {
    const schema = array<string>().min(3);

    const [invalid, errors] = await schema.validate(['h', 'e']);
    expect(invalid).toBe(false);
    expect(errors).toHaveLength(1);

    const [valid, errors2] = await schema.validate(['h', 'p', 'l', 'l']);
    expect(valid).toBe(true);
    expect(errors2).toHaveLength(0);
  });

  it('should validate an array with max length schema', async () => {
    const schema = array<string>().max(3);

    const [invalid, errors] = await schema.validate(['h', 'e', 'l', 'ç']);
    expect(invalid).toBe(false);
    expect(errors).toHaveLength(1);

    const [valid, errors2] = await schema.validate(['h', 'p', 'l']);
    expect(valid).toBe(true);
    expect(errors2).toHaveLength(0);
  });

  it('should validate an array with exact length schema', async () => {
    const schema = array<string>().length(3);

    const [invalid, errors] = await schema.validate(['h', 'e', 'l', 'ç']);
    expect(invalid).toBe(false);
    expect(errors).toHaveLength(1);

    const [invalid2, errors2] = await schema.validate(['h', 'p']);
    expect(invalid2).toBe(false);
    expect(errors2).toHaveLength(1);

    const [valid, errors3] = await schema.validate(['h', 'p', 'l']);
    expect(valid).toBe(true);
    expect(errors3).toHaveLength(0);
  });
});
