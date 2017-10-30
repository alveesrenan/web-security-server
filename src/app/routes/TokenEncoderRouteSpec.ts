import * as chai from 'chai';
import chaiHttp = require('chai-http');

import App from '../../app/main';
import { TokenEncoderRoute } from '../../app/routes/TokenEncoderRoute';

chai.use(chaiHttp);
const expect = chai.expect;
const assert = chai.assert;

describe('#TokenEncoderRoute', () => {
  it('#shoud set in response header the bearer token', (done) => {
    const user = { username: 'ahp_user', password: '123456' };

    chai.request(App)
      .post('/auth')
      .send(user)
      .end((error, response) => {
        expect(response).to.have.status(204);
        expect(response).to.have.header('Authorization');
        done();
      });
  });

  it('#shoud not set in response header the bearer token and return HttpStatus 400', (done) => {
    const user = { username: 'ahp_user_invalid', password: 'incorrect' };

    chai.request(App)
      .post('/auth')
      .send(user)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response).to.not.have.header('Authorization');
        done();
      });
  });
});
