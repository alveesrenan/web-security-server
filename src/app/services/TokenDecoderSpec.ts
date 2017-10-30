import * as chai from 'chai';
import * as HttpStatus from 'http-status-codes';

import { TokenDecoder } from './TokenDecoder';
import { InvalidTokenException } from '../exceptions/InvalidTokenException';

const expect = chai.expect;
const should = chai.should;
const assert = chai.assert;

describe('#TokenDecoder', () => {

  const decoder = null;

  beforeEach(() => this.decoder = new TokenDecoder());

  it('#should throw an exception due to an invalid token provided', done => {
    expect(this.decoder._isNotEmptyOrNullToken.bind(this.decoder, '')).to.throw(Error);

    done();
  });

  it('#should not throw an exception due to a valid token provided', done => {
    expect(this.decoder._isNotEmptyOrNullToken.bind(this.decoder, 'Bearer eyJhbGciOiJI.UzI1NiIsInR5cC.I6IkpXVCJ9')).to.not.throw(Error);

    done();
  });

  it('#should build a TokenModel object with payload provided', done => {
    const payload = {name: 'ahp_user', timeout: 3600};
    const model = this.decoder._buildTokenModel(payload);

    assert.equal(payload.name, model.getUser());
    assert.equal(payload.timeout, model.getTimeout());

    done();
  });
});
