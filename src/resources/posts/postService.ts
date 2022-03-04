import PostModel from "./postModel"
import Post from "./post_interfaces/postInterface"
// import ModelParamsInterface from "./post_interfaces/ModelParamsInterface"


class PostService {
    private post = PostModel

    public async create(
        height: number, 
        weight: number,
        age: number, 
        sex: string
        ): Promise<Post> {
        try {
            const post = await this.post.create({height, weight, age, sex}) 
            return post    
        } 
        
        catch (error) {
            throw new Error('Unable to create post')
        }
    }
}

export default PostService
