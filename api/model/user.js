import mongoose from 'mongoose';

export const createModel = () => {
  const schema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    preference: { type: Object, default: {} },
  });
  return mongoose.model('users', schema);
};
