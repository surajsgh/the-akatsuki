import mongoose from 'mongoose';
import dotenv from 'dotenv';

import app from './app.ts';
import { ExtendedError } from './controllers/errorController.ts';

dotenv.config({ path: `${__dirname}/../config.env` });

const DB = process.env.DATABASE?.replace('<PASSWORD>', process.env.PASSWORD!);

mongoose.set('strictQuery', true);
mongoose.connect(DB!).then(() => console.log('Connected to database...'));

const PORT: number = +process.env.PORT! || 8000;
const server = app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}...`);
});

process.on('unhandledRejection', (error: ExtendedError) => {
  console.log(`${error.name} : ${error.message}`);
  console.log('UNHANDLED REJECTION, shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
