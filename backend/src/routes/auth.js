import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/User.js"
import UserType from "../models/UserType.js"

const router = express.Router()

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const {
            firstName,
            middleName,
            lastName,
            gender,
            contactNumber,
            institutionalEmail,
            courseDepartment,
            yearLevel,
            idNumber,
            username,
            password,
            typeName,
        } = req.body

        // 1. Verify the UserType exists (student, faculty, etc.)
        const typeDoc = await UserType.findOne({ name: typeName.toLowerCase() })
        if (!typeDoc) {
            return res
                .status(400)
                .json({ error: `User type '${typeName}' is invalid.` })
        }

        // 2. Create the new user object
        const newUser = new User({
            firstName,
            middleName,
            lastName,
            gender,
            contactNumber,
            institutionalEmail,
            courseDepartment,
            yearLevel,
            idNumber,
            username,
            password,
            userType: typeDoc._id,
        })

        // 3. Save to MongoDB
        await newUser.save()

        res.status(201).json({ message: "Registration successful!" })
    } catch (err) {
        console.error(err)
        // Handle duplicate errors for username, email, or ID number
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0]
            return res.status(400).json({ error: `${field} already exists.` })
        }
        res.status(500).json({
            error: "Registration failed",
            details: err.message,
        })
    }
})

// LOGIN
router.post("/login", async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        })
        res.json({ token })
    } else {
        res.status(401).json({ error: "Invalid credentials" })
    }
})

router.get("/types", async (req, res) => {
    try {
        const types = await UserType.find({}, "name") // Only return the name field
        res.status(200).json(types)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch user types" })
    }
})

export default router
