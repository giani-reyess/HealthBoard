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
const postModel_1 = __importDefault(require("./postModel"));
// import ModelParamsInterface from "./post_interfaces/ModelParamsInterface"
class PostService {
    constructor() {
        this.post = postModel_1.default;
    }
    create(height, weight, age, sex) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield this.post.create({ height, weight, age, sex });
                return post;
            }
            catch (error) {
                throw new Error('Unable to create post');
            }
        });
    }
}
exports.default = PostService;
//# sourceMappingURL=postService.js.map