import { model, Schema, Types } from 'mongoose';

const groupSchema = new Schema(
    {

        name: {
            type: String,
            required: true,
        },

        description: String,

        admins: {
            type: Types.ObjectId,
            required: true,
            ref: 'user'
        },

        members: [{
            type: Types.ObjectId,
            ref: 'user'
        }],

    },

    { timestamps: true }
);

export default model('group', groupSchema);
