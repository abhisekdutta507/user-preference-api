import mongoose from 'mongoose';
import { MongoDB } from '../constant/secret.js';

const onConnection = () => {
  // prepareModel();
};

export const connect = () => {
  const uri = `mongodb+srv://${MongoDB.username}:${MongoDB.password}@${MongoDB.host}/${MongoDB.database}?retryWrites=true&w=majority`;
  mongoose.connect(uri, { bufferCommands: true });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', onConnection);
};
