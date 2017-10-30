export class TokenParser {

  static parse(authorization: string): string {
    return authorization.replace('Bearer ', '').trim();
  }
}
