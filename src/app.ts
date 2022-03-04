import express, { Application } from "express"
import cors from "cors"
import morgan from "morgan" 
import helmet from "helmet" 
import mongoose from "mongoose"
import RouterController from "./utils/interfaces/routerInterface"


class App {
    public express: Application
    public port: number


    // CONSTRUCTOR: takes an array of router controllers and a port 
    constructor(controllers: RouterController[], port: number) {
        this.express = express()
        this.port = port

        this.InitialiseMiddlewares()
        this.InitialiseRoutes(controllers)
        this.DataBaseConnection()
    }
    
    // INIT-MIDDLEWARE: run all middlewares
    private InitialiseMiddlewares(): void{
        this.express.use(cors())
        this.express.use(morgan('dev'))
        this.express.use(helmet())
        this.express.use(express.json())
    }
    
    // INIT-ROUTES: process all routes  
    private InitialiseRoutes(controllers: RouterController[]): void{
        // Iterates over the array of router controllers
        controllers.forEach( (controller: RouterController) => {
            // Run each of them
            this.express.use("/", controller.router)
        });
    }

    // DataBaseConnection: handle database connection
    private DataBaseConnection(): void {
        const {  MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env
        mongoose.connect(
            `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`
        )
    }
    

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port: ${this.port}`)
        })
    }    
}

export default App
