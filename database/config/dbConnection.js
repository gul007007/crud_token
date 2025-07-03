// import mongoose from "mongoose";
// import dotenv from 'dotenv';
// dotenv.config();
// const connection = {};
// const dbURL = process.env.MONGO_URL;
// if (!dbURL) {
//   console.log("set environment variable in .env", dbURL);
// }

// const connectDB = async () => {
//   if (connection.isConnected) {
//     console.log("using existing connection");
//     return;
//   }
//   // create new connection
//   try {
//     const makeConnection = await mongoose.connect(dbURL, {
//       serverSelectionTimeoutMS: 50000,
//       maxPoolSize: 4,
//     });
//     connection.isConnected = makeConnection.connections[0].readyState;
//     console.log("database connection working");
//   } catch (error) {
//     console.error("DB connection failed:", error);
//     process.exit(1);
//   }
// };

// export default connectDB;


import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';



const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error("Please define the MONGO_URL environment variable");
}

// Global connection cache
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL).then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // Reset on failure
    throw error;
  }

  return cached.conn;
}

export default connectDB;