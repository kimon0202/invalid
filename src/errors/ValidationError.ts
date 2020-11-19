export class ValidationError {
  private _message: string;
  private _path: string;

  public constructor(message: string, path = '') {
    this._message = path ? `${message} at ${path}` : message;
    this._path = path;
  }

  public get message(): string {
    return this._message;
  }

  public get path(): string {
    return this._path;
  }
}
