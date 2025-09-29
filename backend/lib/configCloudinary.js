import { v2 } from 'cloudinary';
import ENV from './env.js';

export const cloudinary = v2.config({
  CLOUDINARY_CLOUD_NAME: ENV.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: ENV.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: ENV.CLOUDINARY_API_SECRET,
});
