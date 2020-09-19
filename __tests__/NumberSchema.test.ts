import { ValidationError } from '../src/errors/ValidationError';
import { number } from '../src/schema/NumberSchema';
import { defaultMessages } from '../src/errors/defaultMessages';

describe('Number Schema API', () => {
  it('should cast the given values', () => {
    const schema = number();

    const string = schema.cast('89.5');
    expect(string).toBe(89.5);

    const num = schema.cast(4);
    expect(num).toBe(4);

    const nan = schema.cast({ hello: 'world' });
    expect(nan).toBeNaN();
  });

  describe('Min Value', () => {
    it('should validate a number with min value schema', async () => {
      const schema = number().min(5);

      const [invalid, errors] = await schema.validate(3);
      expect(invalid).toBe(false);
      expect(errors[0]).toStrictEqual(
        new ValidationError(defaultMessages.number.min(5)),
      );

      const [exact, errors2] = await schema.validate(5);
      expect(exact).toBe(true);
      expect(errors2).toHaveLength(0);

      const [valid, errors3] = await schema.validate(89.5);
      expect(valid).toBe(true);
      expect(errors3).toHaveLength(0);
    });

    it('should validate a number with min value schema (sync)', () => {
      const schema = number().min(5);

      const [invalid, errors] = schema.validateSync(3);
      expect(invalid).toBe(false);
      expect(errors[0]).toStrictEqual(
        new ValidationError(defaultMessages.number.min(5)),
      );

      const [exact, errors2] = schema.validateSync(5);
      expect(exact).toBe(true);
      expect(errors2).toHaveLength(0);

      const [valid, errors3] = schema.validateSync(89.5);
      expect(valid).toBe(true);
      expect(errors3).toHaveLength(0);
    });
  });

  describe('Max Value', () => {
    it('should validate a number with max value schema', async () => {
      const schema = number().max(5);

      const [invalid, errors] = await schema.validate(8);
      expect(invalid).toBe(false);
      expect(errors[0]).toStrictEqual(
        new ValidationError(defaultMessages.number.max(5)),
      );

      const [exact, errors2] = await schema.validate(5);
      expect(exact).toBe(true);
      expect(errors2).toHaveLength(0);

      const [valid, errors3] = await schema.validate(3);
      expect(valid).toBe(true);
      expect(errors3).toHaveLength(0);
    });

    it('should validate a number with max value schema (sync)', () => {
      const schema = number().max(5);

      const [invalid, errors] = schema.validateSync(8);
      expect(invalid).toBe(false);
      expect(errors[0]).toStrictEqual(
        new ValidationError(defaultMessages.number.max(5)),
      );

      const [exact, errors2] = schema.validateSync(5);
      expect(exact).toBe(true);
      expect(errors2).toHaveLength(0);

      const [valid, errors3] = schema.validateSync(3);
      expect(valid).toBe(true);
      expect(errors3).toHaveLength(0);
    });
  });

  describe('Less Than', () => {
    it('should validate a number with a less than schema', async () => {
      const schema = number().lessThan(5);

      const [invalid, errors] = await schema.validate(8);
      expect(invalid).toBe(false);
      expect(errors[0]).toStrictEqual(
        new ValidationError(defaultMessages.number.lessThan(5)),
      );

      const [exact, errors2] = await schema.validate(5);
      expect(exact).toBe(false);
      expect(errors2[0]).toStrictEqual(
        new ValidationError(defaultMessages.number.lessThan(5)),
      );

      const [valid, errors3] = await schema.validate(3);
      expect(valid).toBe(true);
      expect(errors3).toHaveLength(0);
    });

    it('should validate a number with a less than schema (sync)', () => {
      const schema = number().lessThan(5);

      const [invalid, errors] = schema.validateSync(8);
      expect(invalid).toBe(false);
      expect(errors[0]).toStrictEqual(
        new ValidationError(defaultMessages.number.lessThan(5)),
      );

      const [exact, errors2] = schema.validateSync(5);
      expect(exact).toBe(false);
      expect(errors2[0]).toStrictEqual(
        new ValidationError(defaultMessages.number.lessThan(5)),
      );

      const [valid, errors3] = schema.validateSync(3);
      expect(valid).toBe(true);
      expect(errors3).toHaveLength(0);
    });
  });

  describe('Greater than', () => {
    it('should validate a number with a greater than schema', async () => {
      const schema = number().greaterThan(5);

      const [invalid, errors] = await schema.validate(3);
      expect(invalid).toBe(false);
      expect(errors[0]).toStrictEqual(
        new ValidationError(defaultMessages.number.greaterThan(5)),
      );

      const [exact, errors2] = await schema.validate(5);
      expect(exact).toBe(false);
      expect(errors2[0]).toStrictEqual(
        new ValidationError(defaultMessages.number.greaterThan(5)),
      );

      const [valid, errors3] = await schema.validate(8);
      expect(valid).toBe(true);
      expect(errors3).toHaveLength(0);
    });

    it('should validate a number with a greater than schema (sync)', () => {
      const schema = number().greaterThan(5);

      const [invalid, errors] = schema.validateSync(3);
      expect(invalid).toBe(false);
      expect(errors[0]).toStrictEqual(
        new ValidationError(defaultMessages.number.greaterThan(5)),
      );

      const [exact, errors2] = schema.validateSync(5);
      expect(exact).toBe(false);
      expect(errors2[0]).toStrictEqual(
        new ValidationError(defaultMessages.number.greaterThan(5)),
      );

      const [valid, errors3] = schema.validateSync(8);
      expect(valid).toBe(true);
      expect(errors3).toHaveLength(0);
    });
  });

  describe('Negative', () => {
    it('should validate a number with a negative schema', async () => {
      const schema = number().negative();

      const [invalid, errors] = await schema.validate(8);
      expect(invalid).toBe(false);
      expect(errors[0]).toStrictEqual(
        new ValidationError(defaultMessages.number.negative),
      );

      const [exact, errors2] = await schema.validate(0);
      expect(exact).toBe(false);
      expect(errors2[0]).toStrictEqual(
        new ValidationError(defaultMessages.number.negative),
      );

      const [valid, errors3] = await schema.validate(-3);
      expect(valid).toBe(true);
      expect(errors3).toHaveLength(0);
    });

    it('should validate a number with a negative schema (sync)', () => {
      const schema = number().negative();

      const [invalid, errors] = schema.validateSync(8);
      expect(invalid).toBe(false);
      expect(errors[0]).toStrictEqual(
        new ValidationError(defaultMessages.number.negative),
      );

      const [exact, errors2] = schema.validateSync(0);
      expect(exact).toBe(false);
      expect(errors2[0]).toStrictEqual(
        new ValidationError(defaultMessages.number.negative),
      );

      const [valid, errors3] = schema.validateSync(-3);
      expect(valid).toBe(true);
      expect(errors3).toHaveLength(0);
    });
  });

  describe('Positive', () => {
    it('should validate a number with a positive schema', async () => {
      const schema = number().positive();

      const [invalid, errors] = await schema.validate(-3);
      expect(invalid).toBe(false);
      expect(errors[0]).toStrictEqual(
        new ValidationError(defaultMessages.number.positive),
      );

      const [exact, errors2] = await schema.validate(0);
      expect(exact).toBe(false);
      expect(errors2[0]).toStrictEqual(
        new ValidationError(defaultMessages.number.positive),
      );

      const [valid, errors3] = await schema.validate(89.6);
      expect(valid).toBe(true);
      expect(errors3).toHaveLength(0);
    });

    it('should validate a number with a positive schema (sync)', () => {
      const schema = number().positive();

      const [invalid, errors] = schema.validateSync(-3);
      expect(invalid).toBe(false);
      expect(errors[0]).toStrictEqual(
        new ValidationError(defaultMessages.number.positive),
      );

      const [exact, errors2] = schema.validateSync(0);
      expect(exact).toBe(false);
      expect(errors2[0]).toStrictEqual(
        new ValidationError(defaultMessages.number.positive),
      );

      const [valid, errors3] = schema.validateSync(89.6);
      expect(valid).toBe(true);
      expect(errors3).toHaveLength(0);
    });
  });

  describe('Integer', () => {
    it('should validate a number with an interger schema', async () => {
      const schema = number().integer();

      const [invalid, errors] = await schema.validate(9.8653);
      expect(invalid).toBe(false);
      expect(errors[0]).toStrictEqual(
        new ValidationError(defaultMessages.number.integer),
      );

      const [exact, errors2] = await schema.validate(0);
      expect(exact).toBe(true);
      expect(errors2).toHaveLength(0);

      const [valid, errors3] = await schema.validate(-33);
      expect(valid).toBe(true);
      expect(errors3).toHaveLength(0);
    });

    it('should validate a number with an interger schema (sync)', () => {
      const schema = number().integer();

      const [invalid, errors] = schema.validateSync(9.8653);
      expect(invalid).toBe(false);
      expect(errors[0]).toStrictEqual(
        new ValidationError(defaultMessages.number.integer),
      );

      const [exact, errors2] = schema.validateSync(0);
      expect(exact).toBe(true);
      expect(errors2).toHaveLength(0);

      const [valid, errors3] = schema.validateSync(-33);
      expect(valid).toBe(true);
      expect(errors3).toHaveLength(0);
    });
  });
});
