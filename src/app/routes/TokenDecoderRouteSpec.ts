import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import chaiHttp = require('chai-http');

import App from '../../app/main';
import { TokenDecoderRoute } from './TokenDecoderRoute';

chai.use(chaiHttp);
const expect = chai.expect;
const assert = chai.assert;

describe('#TokenDecoderRoute', () => {
  const secret = process.env.TOKEN_GENERATOR_SECRET;

  it('#should return a valid claim with status ok', (done) => {
    const payload = {name: 'ahp_user', expiresIn: new Date().toDateString};
    const token = jwt.sign(payload, secret, { expiresIn: '1 day' });

    chai.request(App)
      .get('/me')
      .set('Authorization', 'Bearer ' + token)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.user).to.eq(payload.name);
        done();
      });
  });

  it('#should not return a valid claim with status unauthorized', done => {
    const payload = {name: 'ahp_user', expiresIn: new Date().toDateString};
    const token = 'invalid token';

    chai.request(App)
      .get('/me')
      .set('Authorization', 'Bearer ' + token)
      .end((error, response) => {
        expect(response).to.have.status(401);
        assert.isUndefined(response.body.user);
        assert.isUndefined(response.body.expiresIn);
        done();
      });
  });

  it('#should not return a valid claim with status forbidden', done => {
    chai.request(App)
      .get('/me')
      .end((error, response) => {
        expect(response).to.have.status(403);
        assert.isUndefined(response.body.user);
        assert.isUndefined(response.body.expiresIn);
        done();
      });
  });
});

