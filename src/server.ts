import 'reflect-metadata';
import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use((e: Error | AppError, req: Request, res: Response, _: NextFunction) => {
  if (e instanceof AppError) {
    return res.status(e.statusCode).json({ status: 'error', message: e.message });
  }

  console.error(e);

  return res.status(500).json({ status: 'error', message: 'Internal server error' });
});

app.listen(8000, () => {
  console.log('🚀 server started on port 8000!');
});
