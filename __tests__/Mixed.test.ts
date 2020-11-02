import { string, number, boolean, object, array, any, parse } from '../src';

describe('Mixed Schema API', () => {
  describe('Required', () => {
    describe('String', () => {
      const schema = string().required();

      it('should throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).rejects.toThrow());

      it('should throw an exception (null)', async () =>
        expect(parse(schema, null)).rejects.toThrow());

      it('should not throw an exception', async () =>
        expect(parse(schema, 'valid string')).resolves.not.toThrow());
    });

    describe('Number', () => {
      const schema = number().required();

      it('should throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).rejects.toThrow());

      it('should throw an exception (null)', async () =>
        expect(parse(schema, null)).rejects.toThrow());

      it('should not throw an exception', async () =>
        expect(parse(schema, 0)).resolves.not.toThrow());
    });

    describe('Boolean', () => {
      const schema = boolean().required();

      it('should throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).rejects.toThrow());

      it('should throw an exception (null)', async () =>
        expect(parse(schema, null)).rejects.toThrow());

      it('should not throw an exception (false)', async () =>
        expect(parse(schema, false)).resolves.not.toThrow());

      it('should not throw an exception (true)', async () =>
        expect(parse(schema, true)).resolves.not.toThrow());
    });

    describe('Object', () => {
      const schema = object({
        str: string().required(),
      }).required();

      it('should throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).rejects.toThrow());

      it('should throw an exception (null)', async () =>
        expect(parse(schema, null)).rejects.toThrow());

      it('should throw an exception (property)', async () =>
        expect(
          parse(schema, {
            str: null,
          }),
        ).rejects.toThrow());

      it('should not throw an exception', async () =>
        expect(
          parse(schema, {
            str: 'this is valid, at least, I hope!',
          }),
        ).resolves.not.toThrow());
    });

    describe('Array', () => {
      const schema = array(number()).required();

      it('should throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).rejects.toThrow());

      it('should throw an exception (null)', async () =>
        expect(parse(schema, null)).rejects.toThrow());

      it('should not throw an exception (empty array)', async () =>
        expect(parse(schema, [])).resolves.not.toThrow());

      it('should not throw an exception', async () =>
        expect(parse(schema, [1, 2, 3])).resolves.not.toThrow());
    });

    describe('Any', () => {
      const schema = any().required();

      it('should throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).rejects.toThrow());

      it('should throw an exception (null)', async () =>
        expect(parse(schema, null)).rejects.toThrow());

      it('should not throw an exception', async () =>
        expect(parse(schema, 'hello string')).resolves.not.toThrow());
    });
  });

  describe('Optional (allowNull)', () => {
    describe('String', () => {
      const schema = string().optional(true);

      it('should not throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).resolves.not.toThrow());

      it('should not throw an exception (null)', async () =>
        expect(parse(schema, null)).resolves.not.toThrow());

      it('should not throw an exception', async () =>
        expect(parse(schema, 'valid string')).resolves.not.toThrow());
    });

    describe('Number', () => {
      const schema = number().optional(true);

      it('should not throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).resolves.not.toThrow());

      it('should not throw an exception (null)', async () =>
        expect(parse(schema, null)).resolves.not.toThrow());

      it('should not throw an exception', async () =>
        expect(parse(schema, 0)).resolves.not.toThrow());
    });

    describe('Boolean', () => {
      const schema = boolean().optional(true);

      it('should not throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).resolves.not.toThrow());

      it('should not throw an exception (null)', async () =>
        expect(parse(schema, null)).resolves.not.toThrow());

      it('should not throw an exception (false)', async () =>
        expect(parse(schema, false)).resolves.not.toThrow());

      it('should not throw an exception (true)', async () =>
        expect(parse(schema, true)).resolves.not.toThrow());
    });

    describe('Object', () => {
      const schema = object({
        str: string().optional(true),
      }).optional(true);

      it('should not throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).resolves.not.toThrow());

      it('should not throw an exception (null)', async () =>
        expect(parse(schema, null)).resolves.not.toThrow());

      it('should not throw an exception (property)', async () =>
        expect(
          parse(schema, {
            str: null,
          }),
        ).resolves.not.toThrow());

      it('should not throw an exception', async () =>
        expect(
          parse(schema, {
            str: 'this is valid, at least, I hope!',
          }),
        ).resolves.not.toThrow());
    });

    describe('Array', () => {
      const schema = array(number()).optional(true);

      it('should not throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).resolves.not.toThrow());

      it('should not throw an exception (null)', async () =>
        expect(parse(schema, null)).resolves.not.toThrow());

      it('should not throw an exception (empty array)', async () =>
        expect(parse(schema, [])).resolves.not.toThrow());

      it('should not throw an exception', async () =>
        expect(parse(schema, [1, 2, 3])).resolves.not.toThrow());
    });

    describe('Any', () => {
      const schema = any().optional(true);

      it('should not throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).resolves.not.toThrow());

      it('should not throw an exception (null)', async () =>
        expect(parse(schema, null)).resolves.not.toThrow());

      it('should not throw an exception', async () =>
        expect(parse(schema, 'hello string')).resolves.not.toThrow());
    });
  });

  describe('Optional (!allowNull)', () => {
    describe('String', () => {
      const schema = string().optional(false);

      it('should not throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).resolves.not.toThrow());

      it('should throw an exception (null)', async () =>
        expect(parse(schema, null)).rejects.toThrow());

      it('should not throw an exception', async () =>
        expect(parse(schema, 'valid string')).resolves.not.toThrow());
    });

    describe('Number', () => {
      const schema = number().optional(false);

      it('should not throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).resolves.not.toThrow());

      it('should throw an exception (null)', async () =>
        expect(parse(schema, null)).rejects.toThrow());

      it('should not throw an exception', async () =>
        expect(parse(schema, 0)).resolves.not.toThrow());
    });

    describe('Boolean', () => {
      const schema = boolean().optional(false);

      it('should not throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).resolves.not.toThrow());

      it('should throw an exception (null)', async () =>
        expect(parse(schema, null)).rejects.toThrow());

      it('should not throw an exception (false)', async () =>
        expect(parse(schema, false)).resolves.not.toThrow());

      it('should not throw an exception (true)', async () =>
        expect(parse(schema, true)).resolves.not.toThrow());
    });

    describe('Object', () => {
      const schema = object({
        str: string().optional(false),
      }).optional(false);

      it('should not throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).resolves.not.toThrow());

      it('should throw an exception (null)', async () =>
        expect(parse(schema, null)).rejects.toThrow());

      it('should throw an exception (property)', async () =>
        expect(
          parse(schema, {
            str: null,
          }),
        ).rejects.toThrow());

      it('should not throw an exception', async () =>
        expect(
          parse(schema, {
            str: 'this is valid, at least, I hope!',
          }),
        ).resolves.not.toThrow());
    });

    describe('Array', () => {
      const schema = array(number()).optional(false);

      it('should not throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).resolves.not.toThrow());

      it('should throw an exception (null)', async () =>
        expect(parse(schema, null)).rejects.toThrow());

      it('should not throw an exception (empty array)', async () =>
        expect(parse(schema, [])).resolves.not.toThrow());

      it('should not throw an exception', async () =>
        expect(parse(schema, [1, 2, 3])).resolves.not.toThrow());
    });

    describe('Any', () => {
      const schema = any().optional(false);

      it('should not throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).resolves.not.toThrow());

      it('should throw an exception (null)', async () =>
        expect(parse(schema, null)).rejects.toThrow());

      it('should not throw an exception', async () =>
        expect(parse(schema, 'hello string')).resolves.not.toThrow());
    });
  });
});
