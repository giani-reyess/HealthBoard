"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerApi = void 0;
const network_1 = __importDefault(require("../components/users/network"));
// This function holds every router middleware
const routerApi = (app) => {
    app.use('/user', network_1.default);
};
exports.routerApi = routerApi;
