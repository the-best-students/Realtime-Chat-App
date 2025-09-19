//connect mongoose to mongodb
import { connect } from 'mongoose';
const connectDb = async () => {
  try {
    await connect(process.env.MONGO_URL);
    console.log('MongoDB connected');
  } catch (error) {
    console.log('MongoDB connection failed');
    process.exit(1);
  }
};

export default connectDb;
