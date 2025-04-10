import mongoose from "mongoose";
import { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile:{
            type:String, //cloudinary url 
            required:true,
        },
        thumbnail:{
            type:String, //cloudinary url 
            required:true,
        },
        title:{
            type:String,
            required:true,
            trim:true,
            index:true,
        },
        description:{
            type:String,
            required:true,
            trim:true,
        },
        duration:{
            type:Number,  // ye duration cloudenery ke url se aayega
            required:true,
        },
        views:{
            type:Number,
            default:0,
        },
        isPublished:{
            type:Boolean,
            default:true,
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        likes:{
            type:Number,
            default:0,
        },
        dislikes:{
            type:Number,
            default:0,
        },
        comments:{
            type:Number,
            default:0,
        },
    },
    {timestamps:true}
);

videoSchema.plugin(mongooseAggregatePaginate); 

export const Video = mongoose.model("Video", videoSchema);