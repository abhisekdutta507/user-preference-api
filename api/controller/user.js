import * as users from '../service/user.js';
import { log } from '../utility/logger.js';

export const findOne = async (request, response) => {
  const { _id } = request.params;
  if (!_id) {
    return response
      .status(400)
      .send({ error: { message: { type: 'error', text: `_id in url is a required field` } }, data: {} });
  }

  const r = await users.findOne(request.params);
  if (r.error) {
    return response.status(404).send(r);
  }

  return response
    .status(200)
    .send(r);
};

export const updateOne = async (request, response) => {
  const { _id } = request.params;
  const { preference } = request.body;
  if (!_id || !preference) {
    return response
      .status(400)
      .send({ error: { message: { type: 'error', text: `_id in url and preference in body are required fields` } }, data: {} });
  }

  const r = await users.updateOne(request.params, request.body);
  if (r.error) {
    return response.status(404).send(r);
  }

  return response
    .status(200)
    .send(r);
};
