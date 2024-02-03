import NextAuth from "next-auth";
import GitHub from "@auth/core/providers/github";
import Credentials from "@auth/core/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

import { z } from "zod";

const loginUserSchema = z.object({
  username: z.string().regex(/^[a-z0-9_-]{3,15}$/g, "Invalid username"),
  password: z.string().min(5, "Password should be minimum 5 characters"),
});

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { type: "text", placeholder: "Please input your username" },
        password: {
          type: "password",
          placeholder: "Please input your password",
        },
      },
      // async authorize(credentials, req) {
      async authorize(credentials) {
        const { username, password } = loginUserSchema.parse(credentials);
        // next-auth.ja signIn with prisma
        const user = await prisma.user.findUnique({
          where: { username },
        });
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return null;

        return user;
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async authorized({ request, auth }) {
      return !!auth?.user;
      // return true;
    },
    // authorized: async ({ request: NextRequest, auth: Session | null}) => {
    //   return true;
    // }
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true
    // },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    // async session({ session, user, token }) {
    //   return session
    // },
    // async jwt({ token, user, account, profile, isNewUser }) {
    //   return token
    // }
  },
  pages: {
    signIn: "/auth/login",
    // signOut: '/auth/signout',
    error: "/auth/error", // Error code passed in query string as ?error=????
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user'              // New users will be directed here on first sign in (leave the property out if not of interest)
  },
});
