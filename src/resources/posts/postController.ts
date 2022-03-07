import { Router, Request, Response, NextFunction } from 'express'
import RouterController from 'utils/interfaces/routerInterface'
import PostService from './postService'


class PostController implements RouterController {
    public path = '/post'
    public router = Router()
    private PostService = new PostService()


    // When "PostController" get instantiated the method 
    // "initialiseRouter" its executed       
    constructor() {
        this.initialiseRouter()
    }


    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        // Try to request the expected data from body 
        try {
            const {height, weight, age, sex} = req.body
            const post = await this.PostService.create(height, weight, age, sex)
            res.status(201).json({ post })
        } 
        // If couldnt throw an error
        catch (error) {
            throw new Error('Unable to create post')
        }
    }

    // Run "create()" method in the given path 
    private initialiseRouter() {
        this.router.post(`${this.path}`, this.create)
    }

}

export default PostController