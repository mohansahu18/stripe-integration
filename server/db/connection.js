import mongoose from 'mongoose';
import dotenv  from "dotenv";
dotenv.config({path:'./.env'})


async function dbConnect() {
 
  try {
    const connectionInstance =  await mongoose.connect(process.env.MONGO_URI)
    console.log(` MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
} catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1)
}
}

export default dbConnect;