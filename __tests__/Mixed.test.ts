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

  describe('Not Required (allowNull)', () => {
    describe('String', () => {
      const schema = string().notRequired(true);

      it('should not throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).resolves.not.toThrow());

      it('should not throw an exception (null)', async () =>
        expect(parse(schema, null)).resolves.not.toThrow());

      it('should not throw an exception', async () =>
        expect(parse(schema, 'valid string')).resolves.not.toThrow());
    });

    describe('Number', () => {
      const schema = number().notRequired(true);

      it('should not throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).resolves.not.toThrow());

      it('should not throw an exception (null)', async () =>
        expect(parse(schema, null)).resolves.not.toThrow());

      it('should not throw an exception', async () =>
        expect(parse(schema, 0)).resolves.not.toThrow());
    });

    describe('Boolean', () => {
      const schema = boolean().notRequired(true);

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
        str: string().notRequired(true),
      }).notRequired(true);

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
      const schema = array(number()).notRequired(true);

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
      const schema = any().notRequired(true);

      it('should not throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).resolves.not.toThrow());

      it('should not throw an exception (null)', async () =>
        expect(parse(schema, null)).resolves.not.toThrow());

      it('should not throw an exception', async () =>
        expect(parse(schema, 'hello string')).resolves.not.toThrow());
    });
  });

  describe('Not Required (!allowNull)', () => {
    describe('String', () => {
      const schema = string().notRequired(false);

      it('should not throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).resolves.not.toThrow());

      it('should throw an exception (null)', async () =>
        expect(parse(schema, null)).rejects.toThrow());

      it('should not throw an exception', async () =>
        expect(parse(schema, 'valid string')).resolves.not.toThrow());
    });

    describe('Number', () => {
      const schema = number().notRequired(false);

      it('should not throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).resolves.not.toThrow());

      it('should throw an exception (null)', async () =>
        expect(parse(schema, null)).rejects.toThrow());

      it('should not throw an exception', async () =>
        expect(parse(schema, 0)).resolves.not.toThrow());
    });

    describe('Boolean', () => {
      const schema = boolean().notRequired(false);

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
        str: string().notRequired(false),
      }).notRequired(false);

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
      const schema = array(number()).notRequired(false);

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
      const schema = any().notRequired(false);

      it('should not throw an exception (undefined)', async () =>
        expect(parse(schema, undefined)).resolves.not.toThrow());

      it('should throw an exception (null)', async () =>
        expect(parse(schema, null)).rejects.toThrow());

      it('should not throw an exception', async () =>
        expect(parse(schema, 'hello string')).resolves.not.toThrow());
    });
  });
});
