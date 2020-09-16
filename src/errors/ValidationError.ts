/**
 * Validation Error
 */
export class ValidationError {
  private readonly _message: string;
  private readonly _path: string;

  /**
   * Creates a new Validation Error
   * @param message Error message
   * @param path Error path
   */
  public constructor(message: string, path = '') {
    this._message = message;
    this._path = path;
  }

  /**
   * Gets the message of the error
   */
  public get message(): string {
    return this._message;
  }

  /**
   * Gets the path of the error
   */
  public get path(): string {
    return this._path;
  }
}
