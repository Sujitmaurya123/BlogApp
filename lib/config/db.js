import mongoose from "mongoose";

  export const ConnectDB=async ()=>{
    await mongoose.connect('mongodb + srv://sujitkic6802maurya:lfapmNKrXgGv61IS@cluster0.oacb1ss.mongodb.net/blog-app')
    console.log("DB Connected");
}