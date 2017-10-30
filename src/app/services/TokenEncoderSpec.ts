import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';

import { TokenEncoder } from './TokenEncoder';

const assert = chai.assert;

describe('#TokenEncoder', () => {

  it('#should return a valid token', done => {
    const user = {username: 'ahp_user', password: '123456'};
    const encoder = new TokenEncoder();
    const token = encoder.encode(user.username, user.password);

    // Verifying if username and password match with token payload
    jwt.verify(token, process.env.TOKEN_GENERATOR_SECRET, (err, decoded) => {
      assert.equal(user.username, decoded.name);
    });

    done();
  });
});
