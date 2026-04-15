"use client"

import { loginAction } from "./actions"
import { useState } from "react"
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"
import Card from "@mui/material/Card"
import TextField from "@mui/material/TextField"

export default function LoginPage() {
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        const result = await loginAction(formData)
        if (!result.success) {
            setError(result.message)
        } else {
            alert("Logged in successfully!")
            // window.location.href = '/dashboard'
        }
        setIsLoading(false)
    }

    const handleOnChange = () => {
        setError("")
    }

    return (
        <div className="flex h-screen items-center place-content-center w-screen">
            <Card className="p-10 flex gap-5 flex-col">
                <h1 className="text-2xl font-bold">Login</h1>
                <form action={handleSubmit} className="flex flex-col gap-5">
                    <TextField
                        id="username"
                        label="Username"
                        variant="outlined"
                        name="username"
                        type="text"
                        size="small"
                        onChange={handleOnChange}
                        required
                    />
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        name="password"
                        type="password"
                        size="small"
                        onChange={handleOnChange}
                        required
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        loading={isLoading}
                    >
                        Sign In
                    </Button>
                </form>
                {error && <Alert severity="error">{error}</Alert>}
            </Card>
        </div>
    )
}
