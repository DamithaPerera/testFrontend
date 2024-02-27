import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";
import authOptions from "./authOptions";

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }