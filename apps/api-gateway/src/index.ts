import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import proxy from 'express-http-proxy';
import { env } from './config/env';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());
app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: (req: any) => (req.user ? 1000 : 100),
  message: 'Too many request, please try again later!',
  standardHeaders: true,
  legacyHeaders: true,
  keyGenerator: (req: any) => ipKeyGenerator(req.ip),
});

app.use(limiter);

app.get('/health', (req, res) => {
  res.send({ message: 'Welcome to the API-Gateway!' });
});

app.use('/', proxy(env.AUTH_SERVICE_URL));

const server = app.listen(env.PORT, () => {
  console.log(`API listening on port: ${env.PORT}`);
});

server.on('error', (err) => {
  console.error('Server Error', err);
});
