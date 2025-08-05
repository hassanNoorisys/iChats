import { model, Schema, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
            unique: true,
        },

        name: {
            type: String,
            required: true,
        },

        mobile: {
            type: String,
            required: true,
            unique: true,
        }
    },

    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (this.isModified('password'))
        this.password = await bcrypt.hash(this.password, 10);

    next();
});

export default model('user', userSchema);
