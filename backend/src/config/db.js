import mongoose from "mongoose"

const connectDb = () => {
    // Connect to MongoDB
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB Connected"))
        .catch((err) => console.log(err))
}

export default connectDb
