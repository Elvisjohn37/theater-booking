import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema(
    {
        // Personal Info
        firstName: { type: String, required: true, trim: true },
        middleName: { type: String, trim: true },
        lastName: { type: String, required: true, trim: true },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other", "Prefer not to say"],
        },
        contactNumber: { type: String, required: true },

        // Academic/Work Info
        institutionalEmail: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        courseDepartment: { type: String, required: true },
        yearLevel: { type: String, required: true }, // e.g., "1st Year", "Grade 11"
        idNumber: { type: String, required: true, unique: true }, // Student or Employee ID

        // Auth Info
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: { type: String, required: true },

        // Role Reference
        userType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserType",
            required: true,
        },
    },
    { timestamps: true },
) // Automatically adds createdAt and updatedAt

// Hash password before saving
UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 10)
})

export default mongoose.model("User", UserSchema)
