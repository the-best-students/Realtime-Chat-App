import express from 'express';
import path from 'path';
import connectDb from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoute.js';
import { ENV } from './lib/env.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import { app, server } from './lib/socket.js';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

//!............. Deployment setup
const __dirname = path.resolve();

if (ENV.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, 'frontend', 'dist');
  app.use(express.static(distPath));
  app.get(/.*/, (req, res) => res.sendFile(path.join(distPath, 'index.html')));
} else {
  app.get('/', (req, res) => res.send('Please set NODE_ENV=production'));
}

//!............. End deployment setup

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = ENV.PORT || 3000;

server.listen(PORT, async () => {
  await connectDb();
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
