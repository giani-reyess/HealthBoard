"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// This is the shape that every post will have 
const PostSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
// Creating the model that take "PostSchema"  
const PostModel = (0, mongoose_1.model)('Post', PostSchema);
exports.default = PostModel;
//# sourceMappingURL=postModel.js.map