import App from './app'
import 'dotenv/config'
import PostController from './resources/posts/postController'
import UserController from './resources/user/userController'

/* 
    "app()" take as fist parameter an array with 
    every controller and will run it by iterating 
    over them with the "InitialiseRoutes()" method
*/

const app = new App(
    [
        new PostController(),
        new UserController(),
    ], Number(process.env.PORT)
)

app.listen()