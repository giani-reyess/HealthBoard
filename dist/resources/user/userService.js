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
const userModel_1 = __importDefault(require("./userModel"));
const tokens_1 = __importDefault(require("../../utils/tokens"));
class UserService {
    constructor() {
        this.user = userModel_1.default;
    }
    /* Add a new user to db and create a token for it */
    register(name, email, password, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.user.create({ name, email, password, role });
                const acessToken = tokens_1.default.createToken(user);
                return acessToken;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    /* Log a user by checking its email in db and validating its password */
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.user.findOne({ email });
                if (!user) {
                    throw new Error('Unable to find user with that email');
                }
                if (yield user.isValidPassword(password)) {
                    return tokens_1.default.createToken(user);
                }
                else {
                    throw new Error('Wrong credentials were given');
                }
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=userService.js.map