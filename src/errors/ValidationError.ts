import { ErrorType } from '../types';

interface InvalidErrorJSON {
  readonly type: ErrorType;

  readonly message: string;
  readonly path: string;
}

export class InvalidError {
  public readonly type: ErrorType;

  public readonly message: string;
  public readonly path: string;

  public constructor(type: ErrorType, message: string, path = '') {
    this.type = type;
    this.message = message;
    this.path = path;
  }

  public static validationError(message: string, path = ''): InvalidError {
    return new InvalidError(ErrorType.Validation, message, path);
  }

  public asJSON(): InvalidErrorJSON {
    return {
      type: this.type,
      path: this.path,
      message: this.message,
    };
  }
}
