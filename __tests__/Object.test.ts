import { object, string, any, validate, number } from '../src';
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

  it('should validate recursivily', async () => {
    const s = object({
      name: string().required(),
      profile: object({
        bio: string().optional(false),
        age: number().positive(),
        social: object({
          twitter: string().required(),
          github: string().required(),
        }),
      }),
    });

    const [value, errors] = await validate(s, {
      name: 'Hello',
      profile: {
        bio: null,
        age: -4,
        social: {
          twitter: undefined,
          github: 45,
        },
      },
    });

    expect(value).toBeNull();
    expect(errors).not.toHaveLength(0);

    const paths = errors.map(err => err.path);
    expect(paths).toContain('profile.bio');
    expect(paths).toContain('profile.age');
    expect(paths).toContain('profile.social.twitter');
    expect(paths).toContain('profile.social.github');
  });

  // eslint-disable-next-line jest/no-commented-out-tests
  // it('should merge', async () => {
  //   const a = object({
  //     name: string(),
  //   });

  //   const b = object({
  //     age: number(),
  //   });

  //   const final = merge(a, b);
  // });
});
