import 'dotenv/config';
// Load environment variables from .env file

const ENV = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
export default ENV;
