import mongoose from 'mongoose';

const connectDB = async () => {

    try {

        const DB_URL = process.env.DB_URL;
        const connection = await mongoose.connect(DB_URL);

        if (connection) console.log('database connected');
    } catch (error) {
        console.log(error)
     
    }
};

export default connectDB;
