import express from 'express';
import connectDb from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoute.js';
import { ENV } from './lib/env.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import { app, server } from './lib/socket.js';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

const PORT = ENV.PORT || 8080;

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
// Error Handling
app.use(notFound);
app.use(errorHandler);

server.listen(PORT, () => {
  connectDb();
  console.log(`listening on port :http://localhost:${PORT}`);
});
