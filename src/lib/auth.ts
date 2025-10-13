import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Nodemailer from "next-auth/providers/nodemailer";
import authConfig from "../../auth.config";
import { findOrCreateUserByEmail } from "./db/users";
import { prisma } from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    // Add providers that require Node.js APIs here
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),

    // Spread any edge-compatible providers from authConfig
    ...authConfig.providers,
  ],
  callbacks: {
    async session({ session }) {
      const { id: userId } = await findOrCreateUserByEmail(session.user.email);

      return {
        ...session,
        user: {
          ...session.user,
          id: userId,
        },
      };
    },
  },
});
