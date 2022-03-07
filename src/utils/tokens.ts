import jwt from 'jsonwebtoken'
import Token from './interfaces/tokensInterface'
import User from '../resources/user/userInterface'

const createToken = (user: User): string => {
    return jwt.sign(
        { id: user._id }, 
        process.env.JWT_SECRET as jwt.Secret, 
        { expiresIn: 'id' }
    )
}

type tokenReturn = Promise<jwt.VerifyErrors | Token> 

const verifyToken = async (token: string): tokenReturn => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token, 
            process.env.JWT_SECRET as jwt.Secret, 
            (err, payload) => {
                if (err) return reject(err)
                resolve(payload as Token)
        })
    }) 
} 

export default { createToken, verifyToken }