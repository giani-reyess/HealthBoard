import App from './app'
import 'dotenv/config'
import PostController from './resources/posts/postController'

/* 
    "app()" take as fist parameter an array with 
    every controller and will run it by iterating 
    over them with the "InitialiseRoutes()" method
*/

const app = new App(
    [
        new PostController(),
    ], Number(process.env.PORT)
)

app.listen()