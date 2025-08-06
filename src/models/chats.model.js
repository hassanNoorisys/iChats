import { model, Schema, Types } from 'mongoose';

const chatSchema = new Schema(
    {

        senderId: {
            type: Types.ObjectId,
            ref: 'user',
            required: true
        },

        groupId: {
            type: Types.ObjectId,
            ref: 'group',
        },

        recieverId: {
            type: Types.ObjectId,
            ref: 'user',
        },

        message: String
    },

    { timestamps: true }
);

export default model('chat', chatSchema);
