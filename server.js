import { createServer } from 'node:http';
import cluster from 'node:cluster';
import { pid, env } from 'node:process';
import os from 'node:os';
import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import cookies from 'cookie-parser';
import * as db from './api/database/connector.js';
import { log } from './api/utility/logger.js';
import { Version } from './api/constant/url.js';
import { router } from './router.js';

const forkWorker = () => {
  cluster.fork();
};

const onConnection = () => {
  // connect the db
  db.connect();
  // log the connect success
  log('server config', { pid, port: env.PORT });
};

const server = () => {
  const app = express();
  const cpus = os.cpus();

  // allow environment file
  config();

  // apply middlewares
  app.use(cors());
  app.use(json());
  app.use(cookies());
  app.use(Version.v1, router());

  // bind event listeners
  if (cluster.isPrimary) {
    cpus.forEach(forkWorker);
    cluster.on('exit', forkWorker);
  } else {
    const server = createServer(app);
    server.listen(env.PORT, onConnection);
  }
};

server();
