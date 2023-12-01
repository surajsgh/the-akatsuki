import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

import testRouter from './routes/testRoute.ts';
import tourRouter from './routes/tourRoute.ts';

declare global {
  namespace Express {
    interface Request {
      requestTime: number;
    }
  }
}

const app = express();

//  MIDDLEWARES
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('logging...');
  next();
});

app.use(morgan('dev'));

app.use((req: Request, res: Response, next: NextFunction) => {
  req.requestTime = Date.now();
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello, world!' });
});

app.use('/api/v1/test', testRouter);
app.use('/api/v1/tour', tourRouter);

interface ExtendedError extends Error {
  status?: string;
  statusCode?: number;
}

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const error: ExtendedError = new Error(
    `Requested URL ${req.originalUrl} not found!`,
  );

  error.statusCode = 404;
  error.status = 'Fail';

  console.log('Test');

  next(error);
});

app.use(
  (error: ExtendedError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.statusCode || 500).json({
      error: true,
      status: error.status,
      message: error.message,
    });
  },
);

export default app;
