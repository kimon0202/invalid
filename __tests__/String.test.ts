import { string } from '../src';

describe('String Schema', () => {
  it('should create a string schema', () => {
    const schema = string().min(5).max(15);
    expect(schema).toBeTruthy();
  });

  it('should test a minimum length schema', () => {
    const schema = string().min(5);

    const invalid = schema.parse('hee');
    const valid = schema.parse('value');

    expect(invalid).toBeNull();
    expect(valid).toBe('value');
  });
});
