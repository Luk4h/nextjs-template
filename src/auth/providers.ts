import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";

// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const user = {
                    id: "1",
                    name: "J Smith",
                    email: "JoeSmith@mail.com",
                };
                if (user) {
                    return user;
                }
                return null;
            },
        }),
        Discord,
        Google({
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
} satisfies NextAuthConfig;
