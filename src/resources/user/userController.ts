import { Router, Request, Response, NextFunction } from 'express'
import RouterController from '../../utils/interfaces/routerInterface'
import HttpException from '../../utils/exceptions/httpException'
import validationMiddleware from '../../middleware/validationMiddleware'
import validate from './userValidation'
import UserService from './userService'
import authenticatedMiddleware from '../../middleware/authenticatedMiddleware'

class UserController implements RouterController {
    public path = '/users'
    public router = Router()
    private UserService = new UserService()

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        )

        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        )
        
        this.router.get(
            `${this.path}`, 
            authenticatedMiddleware, 
            this.getUser)
    }


    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name, email, password } = req.body;
            const token = await this.UserService.register(
                name,
                email,
                password,
                'user'
            )
            res.status(201).json({ token })
            console.log(req.headers.authorization)
        
            } catch (error: any) {
                next(new HttpException(400, error.message))
        }
    }


    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;
            const token = await this.UserService.login(email, password)
            res.status(200).json({ token })
            console.log(req.headers.authorization)
            } catch (error: any) {
                next(new HttpException(400, error.message))
        }
    }

    
    private getUser = (
        req: Request,
        res: Response,
        next: NextFunction
    ): Response | void => {
        if (!req.user) {
            return next(new HttpException(404, 'No logged in user'))
        }

        res.status(200).send({ data: req.user })
    }
}

export default UserController