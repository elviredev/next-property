import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email existe déja.'],
        required: [true, 'Email est requis.'],
    },
    username: {
        type: String,
        required: [true, 'Pseudo est requis.'],
    },
    image: {
        type: String
    },
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Property'
        }
    ]
}, {
    timestamps: true
})

const User = models.User || model('User', UserSchema)

export  default User