import * as jwt from 'jsonwebtoken';
import * as winston from 'winston-color';

import { TokenModel } from '../models/TokenModel';

export class TokenEncoder {

  encode(username: string, password: string): string {
    return this._generateToken(username);
  }

  _generateToken(username: string): string {
    winston.info('Generating token for user ' + username);
    const secret: string = process.env.TOKEN_GENERATOR_SECRET;

    const model = this._buildTokenModel(username);
    const token = jwt.sign(model.payload(), secret, {
        expiresIn: model.getTimeout(),
    });
    return token;
  }

  _buildTokenModel(username: string): TokenModel {
    const timeout = 32400; //9 hours in seconds
    return TokenModel.builder()
      .withUser(username)
      .withTimeout(timeout)
      .build();
  }
}
