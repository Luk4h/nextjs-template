import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import baseConfig from "./baseConfig";
import providers from "./providers";

export const { handlers, signIn, signOut } = NextAuth({
    ...baseConfig,
    ...providers,
    adapter: PrismaAdapter(prisma),
});
