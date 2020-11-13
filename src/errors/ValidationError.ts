export class ValidationError extends Error {
  private _message: string;
  private _path: string;

  public constructor(message: string, path = '') {
    super(`${path}: ${message}`);

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
