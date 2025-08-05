import { model, Schema, Types } from 'mongoose';

const chatSchema = new Schema(
    {

        user: {
            type: Types.ObjectId,
            ref: 'user',
            required: true
        },

        message: String
    },

    { timestamps: true }
);

export default model('chat', chatSchema);
