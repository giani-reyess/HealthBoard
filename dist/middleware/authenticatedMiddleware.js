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
const tokens_1 = __importDefault(require("../utils/tokens"));
const userModel_1 = __importDefault(require("../resources/user/userModel"));
const httpException_1 = __importDefault(require("../utils/exceptions/httpException"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticatedMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Request JWT "signature" (HEADER + PAYLOAD + SECRET) from client
        const bearer = req.headers.authorization;
        // If theres not "signature" on client return an exception
        if (!bearer || !bearer.startsWith('Bearer ')) {
            return next(new httpException_1.default(401, 'Unauthorised'));
        }
        // Get payload from the JWT signature's (bearer)
        const payload = bearer.split('Bearer ')[1].trim();
        try {
            // Compared client and server token  
            const verifiedPayload = yield tokens_1.default.verifyToken(payload);
            if (verifiedPayload instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                return next(new httpException_1.default(401, 'Unauthorised'));
            }
            // Find the payload user's in db 
            const userId = yield userModel_1.default.findById(verifiedPayload.id)
                .select('-password')
                .exec();
            // If the user wasn't found return an exception
            if (!userId) {
                return next(new httpException_1.default(401, 'Unauthorised'));
            }
            req.user = userId;
            return next();
        }
        catch (error) {
            return next(new httpException_1.default(401, 'Unauthorised'));
        }
    });
}
exports.default = authenticatedMiddleware;
//# sourceMappingURL=authenticatedMiddleware.js.map