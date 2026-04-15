"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginAction } from "../app/actions"
import {
    TextField,
    Button,
    Card,
    Typography,
    Alert,
    Box,
    CircularProgress,
    InputAdornment,
    IconButton,
} from "@mui/material"
import { Visibility, VisibilityOff, Lock, Person } from "@mui/icons-material"

export default function LoginForm() {
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        setError("")

        const result = await loginAction(formData)

        if (!result.success) {
            setError(result.message)
            setIsLoading(false)
        } else {
            // Since we are staying on the root route (/),
            // we refresh the server component to detect the new cookie.
            router.refresh()
        }
    }

    return (
        <Card
            sx={{
                p: 4,
                width: "100%",
                maxWidth: 420,
                borderRadius: 3,
                boxShadow: 6,
            }}
        >
            <Box sx={{ mb: 3, textAlign: "center" }}>
                <Typography
                    variant="h4"
                    fontWeight="800"
                    color="primary"
                    gutterBottom
                >
                    Login to iReserve
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Sign in to access your dashboard
                </Typography>
            </Box>

            <form action={handleSubmit}>
                <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                >
                    <TextField
                        label="Username"
                        name="username"
                        variant="outlined"
                        fullWidth
                        required
                        disabled={isLoading}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Person color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        fullWidth
                        required
                        disabled={isLoading}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock color="action" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {error && (
                        <Alert
                            severity="error"
                            variant="filled"
                            sx={{ width: "100%" }}
                        >
                            {error}
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={isLoading}
                        sx={{
                            py: 1.5,
                            fontWeight: "bold",
                            fontSize: "1rem",
                            textTransform: "none",
                            borderRadius: 2,
                        }}
                    >
                        {isLoading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </Box>
            </form>

            <Box sx={{ mt: 4, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                    New student or employee?
                </Typography>
                <Button
                    variant="text"
                    fullWidth
                    sx={{ fontWeight: "bold", mt: 0.5 }}
                    onClick={() => router.push("/register")}
                >
                    Create an Account
                </Button>
            </Box>
        </Card>
    )
}
