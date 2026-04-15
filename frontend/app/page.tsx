import { cookies } from "next/headers"
import DashboardUI from "@/components/DashboardUI"
import LoginForm from "@/components/LoginForm"
import { Box } from "@mui/material"

export default async function Page() {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")

    // If the user is logged in, show the Dashboard
    if (token) {
        return <DashboardUI />
    }

    // If not logged in, show the Login Page layout
    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                width: "100vw",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f5f5f5",
            }}
        >
            <LoginForm />
        </Box>
    )
}
