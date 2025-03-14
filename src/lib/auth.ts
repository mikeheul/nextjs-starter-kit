import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import Resend from "next-auth/providers/resend"
import GitHub from "next-auth/providers/github"
import { Provider } from "next-auth/providers"

const providers: Provider[] = [
    Resend({
        // If your environment variable is named differently than default
        from: "mickael@resend.dev"
    }),
    GitHub,
]

export const providerMap = providers
    .map((provider) => {
        if (typeof provider === "function") {
            const providerData = provider()
            return { id: providerData.id, name: providerData.name }
        } else {
            return { id: provider.id, name: provider.name }
        }
        })
        .filter((provider) => provider.id !== "resend");

export const { handlers, signIn, signOut, auth: baseAuth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: providers,
    pages: {
        signIn: "/signin"
    }
})