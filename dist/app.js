"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
class App {
    // CONSTRUCTOR: takes an array of router controllers and a port 
    constructor(controllers, port) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.InitialiseMiddlewares();
        this.InitialiseRoutes(controllers);
        this.DataBaseConnection();
    }
    // INIT-MIDDLEWARE: run all middlewares
    InitialiseMiddlewares() {
        this.express.use((0, cors_1.default)());
        this.express.use((0, morgan_1.default)('dev'));
        this.express.use((0, helmet_1.default)());
        this.express.use(express_1.default.json());
    }
    // INIT-ROUTES: process all routes  
    InitialiseRoutes(controllers) {
        // Iterates over the array of router controllers
        controllers.forEach((controller) => {
            // Run each of them
            this.express.use("/", controller.router);
        });
    }
    // DataBaseConnection: handle database connection
    DataBaseConnection() {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
        mongoose_1.default.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
    }
    listen() {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port: ${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map