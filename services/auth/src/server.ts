import { Server } from 'http';
import { createApp } from './app';
import { env } from './config/env';

const app = createApp();
let server: Server;

const startServer = () => {
  server = app.listen(env.PORT, () => {
    console.log(`Auth listening on port: ${env.PORT}`);
  });
};

startServer();
