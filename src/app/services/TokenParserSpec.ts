import * as chai from 'chai';

import { TokenParser } from './TokenParser';

const assert = chai.assert;

describe('#TokenParser', () => {
  it('#as a result should return a token replaced without Bearer.', done => {
    const authorization = 'Bearer token';
    assert.equal(TokenParser.parse(authorization), 'token');
    done();
  });
});
