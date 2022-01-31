import 'dotenv/config';
import 'express-async-errors';
import express from 'express';

import { MongoConnection } from './database/mongoConnection';
import { routes } from './routes';

const HOST = process.env.HOST || 'http://localhost';
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MongoConnection();

app.use(routes);

app.listen(PORT, () => console.log(`⚡️:Server is running on ${HOST}:${PORT}`));
