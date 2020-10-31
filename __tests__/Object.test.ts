import { object, string, any } from '../src';
import { ArraySchema } from '../src/schema/ArraySchema';
import { InvalidTypes } from '../src/types';

describe('Object Schema API', () => {
  const schema = object({
    name: string().required(),
    any: any(),
  });

  it('should return an object[]', () => {
    const arr = schema.array();

    expect(arr).toBeInstanceOf(ArraySchema);
    expect(arr.elementType).toBe(InvalidTypes.object);
  });
});
