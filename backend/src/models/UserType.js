import mongoose from "mongoose"

const UserTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        enum: ["student", "faculty", "staff", "admin"],
        lowercase: true,
    },
})

export default mongoose.model("UserType", UserTypeSchema)
