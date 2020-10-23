import { array, object, string, parse, number } from '../src';

const arr: any = [0, 1, 2];
const obj: any = {
  hello: 'world',
  version: 1.4,
};

describe('Schema API', () => {
  it('should test', async () => {
    const arrSchema = array<number>().min(3).max(6).required();
    const objSchema = object({
      hello: string().required(),
      version: number().required(),
    });
    const strSchema = string();

    const v = await parse(arrSchema, arr);
    const o = await parse(objSchema, obj);
    await parse(strSchema, '');

    console.log(o.hello);
    expect(2).toBe(2);
  });
});
