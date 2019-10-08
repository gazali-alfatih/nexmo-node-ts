import * as uuid from 'uuid';
import * as jwt from 'jsonwebtoken';

export class JwtGenerator {
  certifate: Buffer;
  claims: any;

  generate(certifate: Buffer, claims: any = {}) {
    if (!(certifate instanceof Buffer)) {
      throw new Error('cert must be of type Buffer');
    }

    if (!(claims instanceof Object)) {
      throw new Error('claims must be of type object');
    }

    const payload = Object.assign(
      {
        iat: parseInt(String(Date.now() / 1000), 10),
        jti: uuid.v1()
      },
      claims
    );

    const token = jwt.sign(payload, certifate, { algorithm: 'RS256' });
    return token;
  }
}

export default JwtGenerator;
