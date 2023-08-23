import bcrypt from 'bcrypt';
import * as users from '../database/user.js';
import * as userService from '../service/user.js';
import { getToken } from '../utility/token.js';

const ERROR_CONSTANT = { error: { message: { type: 'error', text: `invalid username or password` } }, data: {} };

export const login = async (params = {}) => {
  const { username, password } = params;
  const option = {};
  const r = await users.findOne({ username }, option);
  if (r.error) {
    return ERROR_CONSTANT;
  }
  // compare the hash
  const isValid = await bcrypt.compare(password, r.data.password);
  if(!isValid) {
    return ERROR_CONSTANT;
  }

  const token = getToken({ _id: r.data._id });
  const data = {
    _id: r.data._id,
    username: r.data.username,
    token
  };
  return { data };
};

export const signup = async (docs = {}) => {
  const r = await userService.insertOne(docs);
  if (r.error) {
    return r;
  }

  const token = getToken({ _id: r.data._id });
  const data = {
    _id: r.data._id,
    username: r.data.username,
    token
  };
  return { data };
};
