import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const Connection = async () => {
    const URL = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@ims.e0no3us.mongodb.net/`
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Database connected succesfully');
    } catch (error) {
        console.log('Error from connection', error.message)
        console.log(process.env.USER);
    }
}

export default Connection;