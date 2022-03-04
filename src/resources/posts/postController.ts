import { Router, Request, Response, NextFunction } from 'express'
import RouterController from 'utils/interfaces/routerInterface'
import PostService from './postService'
// import ModelParamsInterface from './post_interfaces/ModelParamsInterface'

class PostController implements RouterController {
    public path = '/post'
    public router = Router()
    private PostService = new PostService()

    constructor() {
        this.initialiseRouter()
    }

    private initialiseRouter() {
        this.router.post(`${this.path}`, this.create)
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {height, weight, age, sex} = req.body
            // const params = {height, weight, age, sex}
            const post = await this.PostService.create(height, weight, age, sex)
            res.status(201).json({ post })
        } 
        
        catch (error) {
            throw new Error('Unable to create post')
        }
    }
}

export default PostController