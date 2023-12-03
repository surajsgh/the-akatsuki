import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';

import testRouter from './routes/testRoute.ts';
import tourRouter from './routes/tourRoute.ts';
import AppError from './utils/appError.ts';
import errorHandler from './controllers/errorController.ts';
import authRouter from './routes/authRouter.ts';

declare global {
  namespace Express {
    interface Request {
      requestTime: number;
    }
  }
}

const app = express();

//  MIDDLEWARES
app.use(helmet());
app.use(express.json({ limit: ' 10kb ' }));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('logging...');
  next();
});

app.use(morgan('dev'));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  }),
);

app.use((req: Request, res: Response, next: NextFunction) => {
  req.requestTime = Date.now();
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello, world!' });
});

app.use('/api/v1/test', testRouter);
app.use('/api/v1/tour', tourRouter);
app.use('/api/v1/auth', authRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;
