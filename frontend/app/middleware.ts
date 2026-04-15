// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")

    // If we are on a protected route and token is gone, redirect
    // This is a safety net for the Root Switcher
    if (!token && request.nextUrl.pathname === "/") {
        return NextResponse.next()
    }
}
