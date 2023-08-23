import * as authService from '../service/auth.js';
import { getCookie } from '../utility/cookie.js';

export const login = async (request, response) => {
  const { username, password } = request.body;
  if (!username || !password) {
    return response
      .status(400)
      .send({ error: { message: { type: 'error', text: `username and password are required fields` } }, data: {} });
  }
  const docs = { username, password };
  const r = await authService.login(docs);
  if (r.error) {
    return response.status(404).send(r);
  }

  return response
    .status(200)
    .cookie(...getCookie({ token: r.data.token }))
    .send(r);
};

export const signup = async (request, response) => {
  const { username, password, preference } = request.body;
  if (!username || !password || !preference) {
    return response
      .status(400)
      .send({ error: { message: { type: 'error', text: `username, password and preference are required fields` } }, data: {} });
  }

  const docs = { username, password, preference };
  const u = await authService.signup(docs);
  if (u.error) {
    return response.status(404).send(u);
  }

  return response
    .status(200)
    .cookie(...getCookie({ token: u.data.token }))
    .send(u);
};
