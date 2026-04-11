"use client"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { ReactNode } from "react"

const theme = createTheme({
    palette: {
        mode: "light",
        primary: { main: "#5E0006" },
    },
})

export default function ThemeRegistry({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
