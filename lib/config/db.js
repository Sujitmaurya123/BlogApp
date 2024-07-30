import mongoose from "mongoose";
const URI = process.env.MONGO_URI;
  export const ConnectDB=async ()=>{
    await mongoose.connect(URI)
    console.log("DB Connected");
}