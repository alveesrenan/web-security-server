import { Router } from 'express';
import { AppRoutes } from './commons/AppRoutes';
import { TokenModel } from '../models/TokenModel';
import { TokenDecoder } from '../services/TokenDecoder';
import { InvalidTokenException } from '../exceptions/InvalidTokenException';

export class TokenDecoderRoute extends AppRoutes {

  _decoder: TokenDecoder;

  constructor(router: Router) {
    super(router, '/me');
    this._decoder = new TokenDecoder();
  }

  _post(): void {
    this.router.get(this.uri, (request, response, next) => {
      const authorizationHeader = request.header('Authorization');
      this._decoder.decode(authorizationHeader, (object, err) => {
        if (err) {
          next(err);
          return;
        }
        response.json(object);
      });
    });
  }

  register(): void {
    this._post();
  }
}
