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
const httpException_1 = __importDefault(require("../../utils/exceptions/httpException"));
const validationMiddleware_1 = __importDefault(require("../../middleware/validationMiddleware"));
const userValidation_1 = __importDefault(require("./userValidation"));
const userService_1 = __importDefault(require("./userService"));
const authenticatedMiddleware_1 = __importDefault(require("../../middleware/authenticatedMiddleware"));
class UserController {
    constructor() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.UserService = new userService_1.default();
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const token = yield this.UserService.register(name, email, password, 'user');
                res.status(201).json({ token });
                console.log(req.headers.authorization);
            }
            catch (error) {
                next(new httpException_1.default(400, error.message));
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield this.UserService.login(email, password);
                res.status(200).json({ token });
                console.log(req.headers.authorization);
            }
            catch (error) {
                next(new httpException_1.default(400, error.message));
            }
        });
        this.getUser = (req, res, next) => {
            if (!req.user) {
                return next(new httpException_1.default(404, 'No logged in user'));
            }
            res.status(200).send({ data: req.user });
        };
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}/register`, (0, validationMiddleware_1.default)(userValidation_1.default.register), this.register);
        this.router.post(`${this.path}/login`, (0, validationMiddleware_1.default)(userValidation_1.default.login), this.login);
        this.router.get(`${this.path}`, authenticatedMiddleware_1.default, this.getUser);
    }
}
exports.default = UserController;
//# sourceMappingURL=userController.js.map