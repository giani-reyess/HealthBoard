"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postService_1 = __importDefault(require("./postService"));
// import ModelParamsInterface from './post_interfaces/ModelParamsInterface'
class PostController {
    constructor() {
        this.path = '/post';
        this.router = (0, express_1.Router)();
        this.PostService = new postService_1.default();
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { height, weight, age, sex } = req.body;
                // const params = {height, weight, age, sex}
                const post = yield this.PostService.create(height, weight, age, sex);
                res.status(201).json({ post });
            }
            catch (error) {
                throw new Error('Unable to create post');
            }
        });
        this.initialiseRouter();
    }
    initialiseRouter() {
        this.router.post(`${this.path}`, this.create);
    }
}
exports.default = PostController;
//# sourceMappingURL=postController.js.map