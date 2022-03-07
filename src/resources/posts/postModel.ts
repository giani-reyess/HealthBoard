import { Schema, model } from "mongoose"
import Post from './post_interfaces/postInterface'

// This is the shape that every post will have 
const PostSchema = new Schema(
    {
        height: {
            type: Number,
            required: true
        },
        
        weight: {
            type: Number,
            required: true
        },

        age: {
            type: Number,
            required: true
        },

        sex: {
            type: String,
            required: true
        }
    },
    {timestamps: true}
)

// Creating the model that take "PostSchema"  
const PostModel = model<Post>('Post', PostSchema)

export default PostModel