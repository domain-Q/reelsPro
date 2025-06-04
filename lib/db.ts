import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI!;

// if the uri is not set, throw an error
if (!MONGO_URI) {
  throw new Error("MONGO_URI is not set in the environment variables");
}
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then(() => {
      console.log('DB Connected');
      
      return mongoose.connection;
    });
  }
  
  try {
     cached.conn = await cached.promise
  } catch (error) {
    // if there is some useless promise is running then it should be clean
    cached.promise = null;

    throw error
  }

  return cached.conn;
}
