import { Schema, model, models } from 'mongoose'

const MessageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        recipient: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        property: {
            type: Schema.Types.ObjectId,
            ref: 'Property',
            required: true
        },
        name: {
           type: String,
           required: [true, 'Le nom est requis']
        },
        email: {
            type: String,
            required: [true, 'L\email est requis']
        },
        phone: {
            type: String
        },
        body: {
            type: String
        },
        read: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
)

const Message = models.Message || model('Message', MessageSchema)

export default Message