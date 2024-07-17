// An array of routes that are accessible to public
// For example the landing pages, docs, t&cs, etc
// @type {string[]}

export const publicRoutes = [
    "/"
];

// An array of routes that are used for authentication
// These routese will redirect logged in users to /dashboard
// @type {string[]}

export const authRoutes = [
    "/auth/login",
    "/auth/signup"
]

// The prefix for API authentication routes
// Routes that start with this prefix are used for API authentication purposes
// @type {string}
export const apiAuthPrefix = "/api/auth"



export const DEFAULT_LOGIN_REDIRECT = "/dashboard"
