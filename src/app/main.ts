import handle from './handlers/ErrorHandler';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';

import { TokenEncoderRoute } from './routes/TokenEncoderRoute';
import { TokenDecoderRoute } from './routes/TokenDecoderRoute';

export class App {

  express: express.Application;

  constructor () {
    this.express = express();
    this._middlewares();
    this._routes();
  }

  _middlewares(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(morgan('dev'));
  }

  _routes(): void {
    const router = express.Router();

    new TokenEncoderRoute(router).register();
    new TokenDecoderRoute(router).register();

    this.express.use('/', router);
    this.express.use(handle);
  }
}

export default new App().express;
