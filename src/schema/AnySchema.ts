/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Schema } from './Schema';

/**
 * Any Schema
 */
class AnySchema extends Schema<any> {
  /**
   * Creates a new Any Schema
   */
  public constructor() {
    super('');
  }
}

/**
 * Creates a new any schema object
 */
export const any = (): AnySchema => new AnySchema();
