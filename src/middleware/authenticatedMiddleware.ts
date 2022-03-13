import { Request, Response, NextFunction } from 'express'
import token from '../utils/tokens'
import UserModel from '../resources/user/userModel'
import Token from '../utils/interfaces/tokensInterface'
import HttpException from '../utils/exceptions/httpException'
import jwt from 'jsonwebtoken'

async function authenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    
    // Request JWT "signature" (HEADER + PAYLOAD + SECRET) from client
    const bearer = req.headers.authorization

    // If theres not "signature" on client return an exception
    if (!bearer || !bearer.startsWith('Bearer ')) {
        return next(new HttpException(401, 'Unauthorised'))
    }
    
    // Get payload from the JWT signature's (bearer)
    const payload = bearer.split('Bearer ')[1].trim()

    try {
        // Compared client and server token  
        const verifiedPayload: Token | jwt.JsonWebTokenError = await token.verifyToken(
            payload
        )
        
        if (verifiedPayload instanceof jwt.JsonWebTokenError) {
            return next(new HttpException(401, 'Unauthorised'))
        }

        // Find the payload user's in db 
        const userId = await UserModel.findById(verifiedPayload.id)
            .select('-password')
            .exec()

        // If the user wasn't found return an exception
        if (!userId) {
            return next(new HttpException(401, 'Unauthorised'))
        }

        req.user = userId
        return next()

    } catch (error) {
        return next(new HttpException(401, 'Unauthorised'))
    }
}

export default authenticatedMiddleware