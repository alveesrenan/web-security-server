export class ValidateCredentials {

  static validate(username: string, password: string) {
    return this._isUserValid(username) && this._isPasswordValid(password);
  }

  static _isUserValid(username: string): boolean {
    return username !== '' && username === process.env.TOKEN_GENERATOR_USERNAME;
  }

  static _isPasswordValid(password: string): boolean {
    return password !== '' && password === process.env.TOKEN_GENERATOR_PASSWORD;
  }
}
