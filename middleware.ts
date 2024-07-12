import { auth } from './auth'

export default auth((req) => {
    const isLoggedIn = !!req.auth
    console.log("Roout:", req.nextUrl.pathname)
})

// optionally, don't invoke Middleware oon some paths
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}