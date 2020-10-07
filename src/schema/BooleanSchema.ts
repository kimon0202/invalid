import { Schema } from './Schema';
import { defaultMessages } from '../defaultMaps';

/**
 * Boolean Schema
 */
class BooleanSchema extends Schema<boolean> {
  /**
   * Creates a new Boolean Schema
   */
  public constructor(message?: string) {
    super(message || defaultMessages.boolean.type);
  }
}

/**
 * Creates a new boolean schema object
 * @param message Message to throw when type validation fails
 */
export const boolean = (message?: string): BooleanSchema =>
  new BooleanSchema(message);
