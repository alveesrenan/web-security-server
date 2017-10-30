import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';
import * as winston from 'winston-color';
import * as HttpStatus from 'http-status-codes';

import { TokenParser } from './TokenParser';
import { TokenModel } from '../models/TokenModel';
import { TokenDecodeCallback } from '../callbacks/TokenDecodeCallback';
import { InvalidTokenException } from '../exceptions/InvalidTokenException';

export class TokenDecoder {

  decode(authorization: string, callback: TokenDecodeCallback) {
    const token = this._getTokenFromHeader(authorization);
    this._decodeToken(token)
      .then(payload => {
        winston.info('Token received from request header was decoded.');
        callback(this._buildTokenModel(payload));
      })
      .catch(error => {
        winston.error('Could not decode token provided due to exception: ' + error);
        callback(null, new InvalidTokenException('The token provided is not valid', HttpStatus.UNAUTHORIZED));
      });
  }

  _decodeToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.TOKEN_GENERATOR_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        }
        resolve(decoded);
      });
    });
  }

  _getTokenFromHeader(authorization: string): string {
    this._isNotEmptyOrNullToken(authorization);
    return TokenParser.parse(authorization);
  }

  _isNotEmptyOrNullToken(authorization: string): void {
    if (_.isEmpty(authorization) || _.isNull(authorization)) {
      throw new InvalidTokenException('Authorization token can not be null', HttpStatus.FORBIDDEN);
    }
  }

  _buildTokenModel(payload): TokenModel {
    return TokenModel.builder()
      .withUser(payload.name)
      .withTimeout(payload.timeout)
      .build();
  }
}
