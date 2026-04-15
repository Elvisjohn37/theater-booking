"use server"

import { cookies } from "next/headers"

export async function loginAction(formData: FormData) {
    const username = formData.get("username")
    const password = formData.get("password")

    try {
        // Use the Node.js API URL you set up earlier
        const response = await fetch(`http://localhost:8080/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })

        const data = await response.json()

        if (response.ok) {
            // 1. Save the token in a HTTP-only cookie for security
            const cookieStore = await cookies()
            cookieStore.set("token", data.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
            })

            return { success: true, message: "Logged in successfully" }
        } else {
            return {
                success: false,
                message: data.error || "Invalid username or password",
            }
        }
    } catch (err) {
        return { success: false, message: "Server connection failed" }
    }
}

export async function logoutAction() {
    const cookieStore = await cookies()

    // 1. Delete the session cookie
    cookieStore.delete("token")

    // 2. No need for a redirect here because DashboardUI
    // will call router.refresh() to update the root view.
    return { success: true }
}
