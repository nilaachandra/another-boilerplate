/**
  * An array of routes that are accessible to the public
  * These routes do not require authentication
  * @type {string[]}
 */
export const publicRoutes = [
    '/'
]

/**
  * An array of routes that are used for authentication
  * These routes will redirect logged in users to /dashboard
  * @type {string[]}
 */
export const authRoutes = [
    '/auth/login',
    'auth/signup'
]

/**
  * The prefix for API authentication routes
  * Routes that start with this prefix are used for API authentication purposes
  * @type {string}
 */
export const apiRoutePrefix = "/api/auth"

/**
  * The default redirect path after an uses logs in.
  * @type {string}
 */
export const defaultLoginRedirect = '/dashboard'

