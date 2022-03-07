import PostModel from "./postModel"
import Post from "./post_interfaces/postInterface"
// import ModelParamsInterface from "./post_interfaces/ModelParamsInterface"


class PostService {
    private postModel = PostModel

    public async create(
        // Set the needed parameters to create a post
        height: number, 
        weight: number,
        age: number, 
        sex: string
        ): Promise<Post> {
        
        // Try to create the post  
        try {
            const post = await this.postModel.create({height, weight, age, sex}) 
            return post    
        
        // If couldnt throw an error 
        } catch (error) {
            throw new Error('Unable to create post')
        }
    }
}

export default PostService
