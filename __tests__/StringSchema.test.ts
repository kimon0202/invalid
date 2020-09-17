import { string } from '../src';
import { defaultMessages } from '../src/errors/defaultMessages';
import { ValidationError } from '../src/errors/ValidationError';

// TODO: Add test for messages
// TODO: Add not required tests

describe('String Schema API', () => {
  it('should cast the given values', () => {
    const schema = string();

    const stringValue = schema.cast('hello');
    expect(stringValue).toBe('hello');

    const number = schema.cast(5);
    expect(number).toBe('5');

    const obj = schema.cast({ hello: 'world' });
    expect(obj).toBe('{"hello":"world"}');
  });

  it('should correctly assert a schema with a minimun length', async () => {
    const schema = string().min(5);

    const [invalid, errors] = await schema.validate('h');
    expect(invalid).toBe(false);
    expect(errors[0]).toStrictEqual(
      new ValidationError(defaultMessages.string.min(5)),
    );

    const [exact, errors2] = await schema.validate('hello');
    expect(exact).toBe(true);
    expect(errors2).toHaveLength(0);

    const [bigger, errors3] = await schema.validate('this is bigger');
    expect(bigger).toBe(true);
    expect(errors3).toHaveLength(0);
  });

  it('should correctly assert a schema with a maximum length', async () => {
    const schema = string().max(5);

    const [valid, errors] = await schema.validate('h');
    expect(valid).toBe(true);
    expect(errors).toHaveLength(0);

    const [exact, errors2] = await schema.validate('hello');
    expect(exact).toBe(true);
    expect(errors2).toHaveLength(0);

    const [bigger, errors3] = await schema.validate('this is bigger');
    expect(bigger).toBe(false);
    expect(errors3[0]).toStrictEqual(
      new ValidationError(defaultMessages.string.max(5)),
    );
  });

  it('should validate an email address', async () => {
    const schema = string().email();

    const [valid] = await schema.validate('test@gmail.com');
    expect(valid).toBe(true);

    const [invalid, errors] = await schema.validate('test');
    expect(invalid).toBe(false);
    expect(errors[0]).toStrictEqual(
      new ValidationError(defaultMessages.string.email),
    );
  });

  it('should validate a matches schema', async () => {
    const schema = string().matches(/([a-z])/);

    const [valid] = await schema.validate('aaaa');
    expect(valid).toBe(true);

    const [invalid, errors] = await schema.validate('AAAA');
    expect(invalid).toBe(false);
    expect(errors[0]).toStrictEqual(
      new ValidationError(defaultMessages.string.matches(/([a-z])/)),
    );
  });

  it('should validate an uuid', async () => {
    const schema = string().uuid();

    const [valid] = await schema.validate(
      '9399ec47-3a5a-484c-b859-a5a808afdc4f',
    );
    expect(valid).toBe(true);

    const [invalid, errors] = await schema.validate('test');
    expect(invalid).toBe(false);
    expect(errors[0]).toStrictEqual(
      new ValidationError(defaultMessages.string.uuid),
    );
  });

  it('should validate an URL', async () => {
    const schema = string().url();

    const [valid] = await schema.validate('https://github.com');
    expect(valid).toBe(true);

    const [valid2] = await schema.validate('https://uol.com.br');
    expect(valid2).toBe(true);

    const [invalid, errors] = await schema.validate('test');
    expect(invalid).toBe(false);
    expect(errors[0]).toStrictEqual(
      new ValidationError(defaultMessages.string.url),
    );
  });

  it('should validate a required string schema', async () => {
    const schema = string().required();

    const [valid, errors] = await schema.validate('');
    expect(valid).toBe(true);
    expect(errors).toHaveLength(0);

    const [valid2, errors2] = await schema.validate('hello');
    expect(valid2).toBe(true);
    expect(errors2).toHaveLength(0);

    const [invalid, errors3] = await schema.validate(null);
    expect(invalid).toBe(false);
    expect(errors3[0]).toStrictEqual(
      new ValidationError(defaultMessages.mixed.required),
    );

    const [invalid2, errors4] = await schema.validate(undefined);
    expect(invalid2).toBe(false);
    expect(errors4[0]).toStrictEqual(
      new ValidationError(defaultMessages.mixed.required),
    );
  });
});
