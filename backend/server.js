import express from 'express';
import connectDb from './lib/db.js';
import ENV from './lib/env.js';
import cookieParser from 'cookie-parser';

const app = express();
connectDb();
import authRoutes from './routes/authRoutes.js';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = ENV.PORT || 8080;

app.use('/auth', authRoutes);

app.listen(PORT, () =>
  console.log(`listening on port :http://localhost:${PORT}`)
);
