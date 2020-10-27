import { InvalidTypes } from '../types';
import { Schema } from './Schema';

/**
 * Boolean Schema
 */
class BooleanSchema extends Schema<boolean> {
  /**
   * Creates a new Boolean Schema
   */
  public constructor() {
    super(InvalidTypes.boolean);
  }

  public check(value: unknown): boolean {
    return typeof value === 'boolean';
  }
}

/**
 * Creates a new boolean schema object
 */
export const boolean = (): BooleanSchema => new BooleanSchema();
