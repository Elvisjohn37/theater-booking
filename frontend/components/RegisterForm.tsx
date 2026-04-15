"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
    TextField,
    Button,
    MenuItem,
    Grid,
    Paper,
    Typography,
    Container,
    Box,
    CircularProgress,
    Alert,
    Divider,
    Stepper,
    Step,
    StepLabel,
    InputAdornment,
} from "@mui/material"
import {
    Person,
    School,
    Lock,
    Email,
    Phone,
    Badge,
    ArrowForward,
    ArrowBack,
    CheckCircle,
} from "@mui/icons-material"

const steps = ["Personal", "Academic", "Account"]

export default function RegisterForm() {
    const router = useRouter()
    const [activeStep, setActiveStep] = useState(0)
    const [userTypes, setUserTypes] = useState<{ _id: string; name: string }[]>(
        [],
    )
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        contactNumber: "",
        institutionalEmail: "",
        courseDepartment: "",
        yearLevel: "",
        idNumber: "",
        username: "",
        password: "",
        typeName: "",
    })

    useEffect(() => {
        async function fetchTypes() {
            try {
                const res = await fetch("http://localhost:3000/api/auth/types")
                const data = await res.json()
                if (res.ok) setUserTypes(data)
            } catch (err) {
                console.error("Error fetching types")
            }
        }
        fetchTypes()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError("")
    }

    const handleNext = () => setActiveStep((prev) => prev + 1)
    const handleBack = () => setActiveStep((prev) => prev - 1)

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const res = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
            const data = await res.json()
            if (res.ok) {
                setActiveStep(3) // Show success state
                setTimeout(() => router.push("/"), 2000)
            } else {
                setError(data.error || "Registration failed")
            }
        } catch (err) {
            setError("Server connection error")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
                <Typography
                    variant="h4"
                    align="center"
                    fontWeight="800"
                    color="primary"
                    gutterBottom
                >
                    UniPortal
                </Typography>
                <Typography
                    variant="body2"
                    align="center"
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    Create your institutional account
                </Typography>

                <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    sx={{ mb: 5 }}
                >
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {activeStep === 3 ? (
                    <Box textAlign="center" py={4}>
                        <CheckCircle
                            color="success"
                            sx={{ fontSize: 60, mb: 2 }}
                        />
                        <Typography variant="h5">
                            Registration Complete!
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Redirecting to login...
                        </Typography>
                    </Box>
                ) : (
                    <Box component="form" noValidate>
                        {/* STEP 1: PERSONAL */}
                        {activeStep === 0 && (
                            <Grid container spacing={2.5}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="First Name"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Last Name"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Middle Name"
                                        name="middleName"
                                        value={formData.middleName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        required
                                    >
                                        {["Male", "Female", "Other"].map(
                                            (opt) => (
                                                <MenuItem key={opt} value={opt}>
                                                    {opt}
                                                </MenuItem>
                                            ),
                                        )}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Contact #"
                                        name="contactNumber"
                                        value={formData.contactNumber}
                                        onChange={handleChange}
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Phone fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        )}

                        {/* STEP 2: ACADEMIC */}
                        {activeStep === 1 && (
                            <Grid container spacing={2.5}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Institutional Email"
                                        name="institutionalEmail"
                                        type="email"
                                        value={formData.institutionalEmail}
                                        onChange={handleChange}
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Email fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Course / Department"
                                        name="courseDepartment"
                                        value={formData.courseDepartment}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="User Type"
                                        name="typeName"
                                        value={formData.typeName}
                                        onChange={handleChange}
                                        required
                                    >
                                        {userTypes.map((t) => (
                                            <MenuItem
                                                key={t._id}
                                                value={t.name}
                                            >
                                                {t.name.toUpperCase()}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Year Level"
                                        name="yearLevel"
                                        value={formData.yearLevel}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Student/Employee ID"
                                        name="idNumber"
                                        value={formData.idNumber}
                                        onChange={handleChange}
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Badge fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        )}

                        {/* STEP 3: ACCOUNT */}
                        {activeStep === 2 && (
                            <Grid container spacing={2.5}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Person fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Lock fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        )}

                        {error && (
                            <Alert severity="error" sx={{ mt: 3 }}>
                                {error}
                            </Alert>
                        )}

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mt: 4,
                            }}
                        >
                            <Button
                                disabled={activeStep === 0 || isLoading}
                                onClick={handleBack}
                                startIcon={<ArrowBack />}
                            >
                                Back
                            </Button>
                            {activeStep === steps.length - 1 ? (
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    sx={{ px: 4 }}
                                >
                                    {isLoading ? (
                                        <CircularProgress
                                            size={24}
                                            color="inherit"
                                        />
                                    ) : (
                                        "Finish"
                                    )}
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    endIcon={<ArrowForward />}
                                    sx={{ px: 4 }}
                                >
                                    Next
                                </Button>
                            )}
                        </Box>
                    </Box>
                )}
            </Paper>
        </Container>
    )
}
