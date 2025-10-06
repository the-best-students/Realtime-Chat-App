//connect mongoose to mongodb
import { connect } from 'mongoose';
import colors from 'colors';
import { ENV } from './env.js';

const connectDb = async () => {
  try {
    const conn = await connect(ENV.MONGO_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`.yellow.underline);
  } catch (error) {
    console.log('MongoDB connection failed');
    process.exit(1);
  }
};

export default connectDb;
