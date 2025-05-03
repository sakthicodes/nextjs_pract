import mongoose, { Mongoose } from "mongoose";
 
const MONGODB_URI: string = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in the environment variables.");
}
 
let cached: { conn: Mongoose | null; promise: Promise<Mongoose> | null } = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB(): Promise<Mongoose> {
  if (cached.conn) { 
    return cached.conn;
  }

  if (!cached.promise) { 
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false, 
      useNewUrlParser: true,  
      useUnifiedTopology: true,  
    }).then((mongooseInstance) => {
      console.log("MongoDB connected successfully.");
      return mongooseInstance;
    }).catch((error) => {
      console.error("MongoDB connection error:", error);
      throw new Error("Failed to connect to MongoDB.");
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
