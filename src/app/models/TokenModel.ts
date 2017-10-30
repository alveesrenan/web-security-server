export class TokenModel {

  user: string;
  timeout: number;

  static builder(): TokenModel {
    return new TokenModel();
  }

  withUser(user: string): TokenModel {
    this.user = user;
    return this;
  }

  withTimeout(timeout: number): TokenModel {
    this.timeout = timeout;
    return this;
  }

  build(): TokenModel {
    return this;
  }

  payload() {
    return {name: this.user, timeout: this.timeout};
  }

  // for unit tests only
  getUser(): string { return this.user; }
  getTimeout(): number { return this.timeout; }
}
