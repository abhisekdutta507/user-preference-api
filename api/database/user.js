import { users } from '../model/index.js';

export const findOne = async (params = {}, option = {}) => {
  let r;

  try {
    r = await users.findOne(params).select(option.select);
  } catch(e) {
    return { error: { message: { type: 'error', text: e.message } }, data: {} };
  }

  if (!r) {
    return { error: { message: { type: 'error', text: `can not find the users` } }, data: {} };
  }

  return { data: r };
};

export const insertOne = async (docs = {}) => {
  let r;

  try {
    r = await users.create(docs);
  } catch(e) {
    return { error: { message: { type: 'error', text: e.message } }, data: {} };
  }

  if (!r) {
    return { error: { message: { type: 'error', text: `can not create users` } }, data: {} };
  }

  return { data: r };
};

export const updateOne = async (params = {}, docs = {}, option = {}) => {
  let r;

  try {
    r = await users.updateOne(params, docs, option);
  } catch(e) {
    return { error: { message: { type: 'error', text: e.message } }, data: {} };
  }

  if (!r.matchedCount) {
    return { error: { message: { type: 'error', text: `can not find the names` } }, data: {} };
  }

  return { data: r };
};
