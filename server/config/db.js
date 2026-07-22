import mongoose from "mongoose";

// Connect to MongoDB Atlas
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
      console.error(`❌ MongoDB Connection Failed: ${error.message}`);
      console.error("Name:", error.name);
      console.error("Message:", error.message);
      console.error("Code:", error.code);

      process.exit(1);
    }
};

export default connectDB;