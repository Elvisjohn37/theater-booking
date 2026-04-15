import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import authRoutes from "./routes/auth.js"
import protectedMiddleware from "./middleware/auth.js"
import connectDb from "./config/db.js"
import UserType from "./models/UserType.js"
import cors from "cors"

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

connectDb()

// Routes
app.use("/api/auth", authRoutes)

const seedRoles = async () => {
    const roles = ["student", "faculty", "staff", "admin"]

    for (const role of roles) {
        const exists = await UserType.findOne({ name: role })
        if (!exists) {
            await UserType.create({ name: role })
            console.log(`Role ${role} created!`)
        }
    }
}

seedRoles()

// Example Protected Route
app.get("/api/dashboard", protectedMiddleware, (req, res) => {
    res.json({
        message: "Welcome to the secret dashboard!",
        userId: req.user.id,
    })
})

app.listen(8080, () => console.log("Server running on port 8080"))
