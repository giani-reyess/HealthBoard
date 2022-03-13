import UserModel from './userModel'
import token from '../../utils/tokens'

class UserService {
    private user = UserModel

    /* Add a new user to db and create a token for it */
    public async register(
        name: string,
        email: string,
        password: string,
        role: string,
    
    ): Promise<string | Error> {
        try {
            const user = await this.user.create({name, email, password, role})
            const acessToken = token.createToken(user)
            return acessToken 
        } catch (error: any) {
            throw new Error(error)
        }
    }

    /* Log a user by checking its email in db and validating its password */
    public async login(
        email: string,
        password: string,
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email })
            
            if (!user) {
                throw new Error('Unable to find user with that email')   
            }

            if (await user.isValidPassword(password)) {
                return token.createToken(user)
            } else {
                throw new Error('Wrong credentials were given') 
            }

        } catch (error: any) {
            throw new Error(error) 
        }
    }

}

export default UserService