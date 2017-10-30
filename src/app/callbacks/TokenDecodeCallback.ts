import { TokenModel } from '../models/TokenModel';
import { InvalidTokenException } from '../exceptions/InvalidTokenException';

export interface TokenDecodeCallback {
  (model: TokenModel, err?: InvalidTokenException);
}
