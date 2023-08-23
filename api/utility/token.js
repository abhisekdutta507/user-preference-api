import jwt from 'jsonwebtoken';
import { PrivateKey, JWTAlgorithm } from '../constant/secret.js';

const expiresIn = 10 * 60; // 10 minutes

export const getToken = (data = {}) => {
  // for RSA algorithm we have to use a .key file
  // that logic can be added here
  const token = jwt.sign(data, PrivateKey, { algorithm: JWTAlgorithm, expiresIn });
  return `Bearer ${token}`;
};

export const decode = (token = '') => {
  /**
   * @description token must start with Bearer text.
   */
  let regex = /^(Bearer\s)/gm
  if(!regex.test(token)) {
    return { error: 'invalid token' }
  }

  /**
   * Remove the Bearer text from token.
   */
  token = token.replace('Bearer ', '');

  let r
  try {
    r = jwt.verify(token, PrivateKey || 'abc');
  } catch(e) {
    return { error: e.message };
  }
  return r;
}
