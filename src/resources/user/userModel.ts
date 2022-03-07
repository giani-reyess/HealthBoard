import {Schema,model} from 'mongoose'
import User from './userInterface'
import bcrypt from 'bcrypt'

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },

        name: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
)
 

UserSchema.pre<User>('save', async next => {
    if (!this.isModified('password')) {
        return next()
    }

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash 
    next()
})

UserSchema.methods.isValidPassword = async (
    password: string
    ): Promise<Error | boolean> => {
        return await bcrypt.compare(password, this.password)
}

const UserModel = model<User>('User', UserSchema)

export default UserModel