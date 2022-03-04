"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("dotenv/config");
const postController_1 = __importDefault(require("./resources/posts/postController"));
const app = new app_1.default([
    new postController_1.default(),
], Number(process.env.PORT));
app.listen();
//# sourceMappingURL=index.js.map