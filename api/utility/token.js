import jwt from 'jsonwebtoken';
import { PrivateKey, JWTAlgorithm } from '../constant/secret.js';

const expiresIn = 10 * 60; // 10 minutes

export const getToken = (data = {}) => {
  // for RSA algorithm we have to use a .key file
  // that logic can be added here
  const token = jwt.sign(data, PrivateKey, { algorithm: JWTAlgorithm, expiresIn });
  return `Bearer ${token}`;
};
