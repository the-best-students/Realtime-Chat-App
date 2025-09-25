import express from 'express';
import connectDb from './lib/db.js';
import ENV from './lib/env.js';
const app = express();
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = ENV.PORT || 8080;
import authRoutes from './routes/authRoutes.js';

app.use('/auth', authRoutes);

app.listen(PORT, () =>
  console.log(`listening on port :http://localhost:${PORT}`)
);
