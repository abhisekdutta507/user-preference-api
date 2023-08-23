import { log } from '../utility/logger.js';
import { decode } from '../utility/token.js';

export const idInToken = async (request, response, next) => {
  const { _id } = request.params;
  const { Authorization } = request.cookies;

  const token = decode(Authorization);
  if(token.error) {
    return response.status(401).send({ message: { type: 'error', text: token.error }, data: {} });
  }
  if (token._id !== _id) {
    return response.status(401).send({ message: { type: 'error', text: 'invalid token' }, data: {} });
  }
  next();
};
