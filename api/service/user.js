import bcrypt from 'bcrypt';
import { log } from '../utility/logger.js';
import * as users from '../database/user.js';
import { SaltRound } from '../constant/secret.js';

export const findOne = async (params = {}) => {
  // we can generate custom options here to sort, skip, limit, select & populate
  const option = {
    select: ['username', 'preference'],
  };
  const r = await users.findOne(params, option);
  return r;
};

export const insertOne = async (data = {}) => {
  const { username, password, preference } = data;
  const salt = await bcrypt.genSalt(SaltRound);
  const hash = await bcrypt.hash(password, salt);
  
  const docs = {
    username,
    preference,
    password: hash
  };
  const r = await users.insertOne(docs);
  return r;
};

export const updateOne = async (params, data) => {
  // we can generate custom options here to sort, skip, limit & some more
  const option = {};
  const { preference } = data;

  const docs = {
    preference,
  };
  const r = await users.updateOne(params, docs, option);
  return r;
};