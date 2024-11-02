import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/app/lib/db"

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string
      }
      return session
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      if (user) {
        token.id = user.id
      }
      return token
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/") || url.startsWith(baseUrl)) {
        if (url.startsWith("/?callbackUrl=")) {
          const callbackUrl = decodeURIComponent(url.split("callbackUrl=")[1])
          return `${baseUrl}${callbackUrl}`
        }
        return url
      }
      return baseUrl
    }
  },
  pages: {
    signIn: '/',
  },
  session: {
    strategy: "jwt"
  }
})

export { handler as GET, handler as POST }