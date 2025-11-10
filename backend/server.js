import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
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

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = ENV.PORT || 3000;

server.listen(PORT, async () => {
  await connectDb();
  console.log(`Server running on http://localhost:${PORT}`);
});
