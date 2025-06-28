import { connect } from 'mongoose';
import { GreenLog, RedLog } from '../utils/Logger.js';

const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI);
    GreenLog('Database Connected Successfully.');
  } catch (error) {
    RedLog('Error in connecting database.', error);
  }
};

export default connectDB;
