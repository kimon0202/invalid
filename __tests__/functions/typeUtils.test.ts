import { getType } from '../../src/utils/typeUtils';
import { InvalidType } from '../../src/types';

describe('Type Utils', () => {
  it('should return string', () =>
    expect(getType('hello')).toBe(InvalidType.string));

  it('should return number', () =>
    expect(getType(44)).toBe(InvalidType.number));

  it('should return boolean (true)', () =>
    expect(getType(true)).toBe(InvalidType.boolean));

  it('should return boolean (false)', () =>
    expect(getType(false)).toBe(InvalidType.boolean));

  it('should return symbol', () =>
    expect(getType(Symbol('h'))).toBe(InvalidType.symbol));

  it('should return nan', () =>
    expect(getType(Number({}))).toBe(InvalidType.nan));

  it('should return object', () =>
    expect(getType({})).toBe(InvalidType.object));

  it('should return array', () => expect(getType([])).toBe(InvalidType.array));

  it('should return date', () =>
    expect(getType(new Date())).toBe(InvalidType.date));

  it('should return bigint', () =>
    expect(getType(BigInt(9007199254740991))).toBe(InvalidType.bigint));

  it('should return undefined', () =>
    expect(getType(undefined)).toBe(InvalidType.undefined));

  it('should return null', () => expect(getType(null)).toBe(InvalidType.null));

  it('should return function', () =>
    expect(getType(() => true)).toBe(InvalidType.function));

  it('should return promise', () =>
    expect(getType(new Promise(() => true))).toBe(InvalidType.promise));
});
