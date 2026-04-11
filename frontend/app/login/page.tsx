"use client"

import { loginAction } from "../actions"
import { useState } from "react"

export default function LoginPage() {
    const [error, setError] = useState("")

    async function handleSubmit(formData: FormData) {
        const result = await loginAction(formData)
        if (!result.success) {
            setError(result.message)
        } else {
            alert("Logged in successfully!")
            // window.location.href = '/dashboard'
        }
    }

    return (
        <div className="flex flex-col gap-4 p-10">
            <h1 className="text-2xl font-bold">Login</h1>
            <form action={handleSubmit} className="flex flex-col gap-2">
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    className="border p-2 text-black"
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="border p-2 text-black"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2">
                    Sign In
                </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}
