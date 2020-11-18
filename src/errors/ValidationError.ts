export class ValidationError extends Error {
  private _message: string;
  private _path: string;

  public constructor(message: string, path = '') {
    const finalMessage = path ? `${message} at ${path}` : message;
    super(finalMessage);

    this._message = message;
    this._path = path;
  }

  public get message(): string {
    return this._message;
  }

  public get path(): string {
    return this._path;
  }
}
