import { Document } from 'mongoose'

interface Post extends Document {
    height: number
    weight: number
    age: number
    sex: string
}

export default Post