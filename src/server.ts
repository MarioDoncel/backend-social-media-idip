import 'dotenv/config';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import { MongoConnection } from './database/mongoConnection';
import { castErrorHandler } from './middlewares/castErrorhandler';
import { errorHandler } from './middlewares/errorHandler';
import { mongoErrorHandler } from './middlewares/mongoErrorHandler';
import { routes } from './routes';

const HOST = process.env.HOST || 'http://localhost';
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

MongoConnection();

app.use(routes);

app.use(mongoErrorHandler);
app.use(castErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => console.log(`⚡️:Server is running on ${HOST}:${PORT}`));
