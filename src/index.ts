import App from './app'
import 'dotenv/config'
import PostController from './resources/posts/postController'

const app = new App(
    [
        new PostController(),
    ], Number(process.env.PORT)
)

app.listen()