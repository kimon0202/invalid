import { ValidationError } from './ValidationError';

export class TypeError {
  private readonly _expected: string;
  private readonly _received: string;

  public constructor(expected: string, received: string) {
    this._expected = expected;
    this._received = received;
  }

  public get expected(): string {
    return this._expected;
  }

  public get received(): string {
    return this._received;
  }

  public asValidationError(): ValidationError {
    return new ValidationError(
      `Incorrect Type: expected ${this.expected}, but received ${this.received}`,
    );
  }
}
