/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { InvalidTypes } from '../types';
import { Schema } from './Schema';

/**
 * Any Schema
 */
export class AnySchema extends Schema<any> {
  /**
   * Creates a new Any Schema
   */
  public constructor() {
    super(InvalidTypes.any);
  }

  public check() {
    return true;
  }
}

/**
 * Creates a new any schema object
 */
export const any = (): AnySchema => new AnySchema();
