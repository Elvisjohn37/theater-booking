"use server"

export async function loginAction(formData: FormData) {
    const username = formData.get("username")
    const password = formData.get("password")

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_PHP_API_URL}/auth/login.php`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        },
    )

    const data = await response.json()

    if (response.ok) {
        // Handle success (e.g., set cookies or redirect)
        return { success: true, message: data.message }
    } else {
        // Handle error
        return { success: false, message: data.message || "Login failed" }
    }
}
