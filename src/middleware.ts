import NextAuth from "next-auth";
import authConfig from "../auth.config";
import { authRoutes, default_login_redirect } from "./routes";

const { auth } = NextAuth(authConfig)

// middleware is unlocked for matcher route. 
// generally middleware is used for set access in routes.

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = req.auth
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(default_login_redirect, nextUrl))
        }
    }
})


export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}