import {Schema,model} from 'mongoose'
import User from './userInterface'
import bcrypt from 'bcrypt'

/* This is the shape of the "User" data */ 
const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
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
 
/* If the user insert a password, hash it */
UserSchema.pre<User>('save', async function (next){
    if (!this.isModified('password')) {
        return next()
    }
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash 
    next()
})

/* Compare the hashed password with the saved in db */
UserSchema.methods.isValidPassword = async function (
    password: string
    ): Promise<Error | boolean> {
        return await bcrypt.compare(password, this.password)
}

const UserModel = model<User>('User', UserSchema)

export default UserModel