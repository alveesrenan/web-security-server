import * as chai from 'chai';

import { ValidateCredentials } from './ValidateCredentials';

const assert = chai.assert;

describe('#ValidateCredentials', () => {

  it('#should return true with valid username and password', (done) => {
    assert.equal(true, ValidateCredentials.validate('ahp_user', '123456'));
    done();
  });

  it('#should return false with invalid username and password', (done) => {
    assert.equal(false, ValidateCredentials.validate('unknown user', 'incorrect password'));
    done();
  });

  it('#should return true with valid username', (done) => {
    assert.equal(true, ValidateCredentials._isUserValid('ahp_user'));
    done();
  });

  it('#should return false with invalid username', (done) => {
    assert.equal(false, ValidateCredentials._isUserValid('unknown user'));
    done();
  });

  it('#should return true with valid password', (done) => {
    assert.equal(true, ValidateCredentials._isPasswordValid('123456'));
    done();
  });

  it('#should return false with invalid username', (done) => {
    assert.equal(false, ValidateCredentials._isPasswordValid('incorrect password'));
    done();
  });
});
