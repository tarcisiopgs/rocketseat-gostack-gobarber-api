import 'reflect-metadata';
import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from '@shared/infra/http/routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
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
