// Seperated the config file to support edge compatibility since Prisma adapter by default doesn't work on the edge
// And this will be used in the middleware

import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export default {
    providers: [GitHub]
} satisfies NextAuthConfig