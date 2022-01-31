import mongoose from 'mongoose';

import { environmentVariables } from '../config/environment';

const { MONGO_CONNECTION } = environmentVariables;

export const MongoConnection = async () => {
  try {
    await mongoose.connect(MONGO_CONNECTION);
    console.log('💾:Database Connected');
  } catch (error) {
    console.error(error);
    process.exit();
  }
};
