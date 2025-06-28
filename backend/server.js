import cors from 'cors';
import 'dotenv/config.js';
import express from 'express';
import cookieParser from 'cookie-parser';

import userRoute from './routes/userRoute.js';
import contactRoute from './routes/contactRoute.js';
import connectDB from './database/db.js';
import { GreenLog } from './utils/Logger.js';
import {
  errorConverter,
  errorHandler,
  notFound,
} from './middleware/error/errorMiddleware.js';

//* Db and  .env config
connectDB();

const app = express();
const port = process.env.PORT;

//* Config Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

//* Resources Middleware
app.use('/api/users', userRoute);
app.use('/api/contacts', contactRoute);

//* Error Middleware
app.use(notFound);
app.use(errorConverter);
app.use(errorHandler);

app.listen(port, () => GreenLog(`Server running on port ${port}.`, 'blue'));
