import * as HttpStatus from 'http-status-codes';

import { Router } from 'express';
import { ServerResponse } from 'https';

import { AppRoutes } from './commons/AppRoutes';
import { TokenModel } from '../models/TokenModel';
import { ValidateCredentials } from '../services/ValidateCredentials';
import { TokenEncoder } from '../services/TokenEncoder';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';

export class TokenEncoderRoute extends AppRoutes {

  _tokenEncoder: TokenEncoder;

  constructor(router: Router) {
    super(router, '/auth');
    this._tokenEncoder = new TokenEncoder();
  }

  _post(): void {
    this.router.post(this.uri, (request, response, next) => {
      const username = request.body.username;
      const password = request.body.password;

      if (!ValidateCredentials.validate(username, password)) {
        next(new UnauthorizedException('Invalid username or password.', HttpStatus.BAD_REQUEST));
        return;
      }
      const token = this._tokenEncoder.encode(username, password);
      this._writeInHeader(response, token);
    });
  }

  _writeInHeader(response, token: string): void {
    response.setHeader('Authorization', 'Bearer ' + token);
    response.status(HttpStatus.NO_CONTENT);
    response.end();
  }

  register(): void {
    this._post();
  }
}
