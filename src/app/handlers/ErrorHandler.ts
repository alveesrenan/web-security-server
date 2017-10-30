import { UnauthorizedException } from '../exceptions/UnauthorizedException';
import { Application } from 'express';

export class ErrorHandler {

  handle(error: UnauthorizedException, req, res, next) {
    res.status(error.status).json({
      message: error.message
    });
  }
}

export default new ErrorHandler().handle;
