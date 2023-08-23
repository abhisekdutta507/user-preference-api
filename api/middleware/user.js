import { log } from '../utility/logger.js';

export const idInToken = (request, response, next) => {
  const { _id } = request.params;
  log('middleware authentication & authorization', { _id });
  next();
};
