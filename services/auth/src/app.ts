import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';

export const createApp = (): Express => {
  const app = express();

  app.use(
    cors({
      origin: ['http://localhost:3000'],
      allowedHeaders: ['Authorization', 'Content-Type'],
      credentials: true,
    })
  );
  app.use(helmet());

  app.get('/auth-health', (req, res) => {
    res.send({ message: 'Welcome to Auth Service!' });
  });

  return app;
};
