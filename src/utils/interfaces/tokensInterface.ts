import { Schema } from "mongoose"

interface Token extends Object {
    id: Schema.Types.ObjectId
    expireIn: number
} 

export default Token