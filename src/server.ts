import mongoose from 'mongoose';
import dotenv from 'dotenv';

import app from './app.ts';

dotenv.config({ path: `${__dirname}/../config.env` });

const DB = process.env.DATABASE?.replace('<PASSWORD>', process.env.PASSWORD!);

mongoose.set('strictQuery', true);
mongoose.connect(DB!).catch((err) => console.log(err));

const PORT: number = +process.env.PORT! || 8000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}...`);
});
