import { Schema, model } from "mongoose"
import Post from './post_interfaces/postInterface'

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

const PostModel = model<Post>('Post', PostSchema)

export default PostModel