import { array, object, string, parse } from '../src';

describe('Schema API', () => {
  it('should test', async () => {
    const arrSchema = array();
    const objSchema = object();
    const strSchema = string();

    await parse(arrSchema, '');
    await parse(objSchema, '');
    await parse(strSchema, '');

    expect(2).toBe(2);
  });
});
