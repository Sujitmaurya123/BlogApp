import { ConnectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import {writeFile} from 'fs/promises';
import BlogModel from "@/lib/models/BlogModel";
import fs from "fs";
const LoadDB=async()=>{
    await ConnectDB();
}
LoadDB();
// API To GET All Blogs
 export async function GET(request){
    const blogId=request.nextUrl.searchParams.get("id");
    if(blogId){
        const blog =await BlogModel.findById(blogId);
        return NextResponse.json(blog);
    }else{
        const blogs= await BlogModel.find({});
        return NextResponse.json({
            blogs
        });
    }
 }
// API EndPoint Uploading Blog
 export async function POST(request){
    const formData =await request.formData();
    const timestamp =Date.now();

    const image =formData.get('image');
    const imageByteData =await image.arrayBuffer();
    const buffer =Buffer.from(imageByteData);
    const path =`./public/${timestamp}_${image.name}`;
    await writeFile(path,buffer);
     const imgUrl = `/${timestamp}_${image.name}`;

    //  console.log(imgUrl);

    const blogData={
        title:`${formData.get('title')}`,
        description:`${formData.get('description')}`,
        category:`${formData.get('category')}`,
        author:`${formData.get('author')}`,
        image:`${imgUrl}`,
        authorImg:`${formData.get('authorImg')}`
    }
    await BlogModel.create(blogData);
    console.log("Blog Save");
     return NextResponse.json({
        success:true,
        msg:"Blog Added Successfully"
     })
 }

 // Create API EndPoint to delete Blog

 export async function DELETE(request){
    const id= await request.nextUrl.searchParams.get('id');
    const blog=await BlogModel.findById(id);
    fs.unlink(`./public${blog.image}`,()=>{});

    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({
        msg:"Blog Deleted"
    })

 }