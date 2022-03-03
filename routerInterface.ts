import { Router } from 'express'

interface RouterController {
    path: string,
    router: Router
}

export default RouterController