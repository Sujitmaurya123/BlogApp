import mongoose from "mongoose";

  export const ConnectDB=async ()=>{
    await mongoose.connect('mongodb://0.0.0.0:27017/blog-app')
    console.log("DB Connected");
}