import NextAuth, { User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Nodemailer from "next-auth/providers/nodemailer";
import { prisma } from "./prisma";
import authConfig from "../../auth.config";
import { findOrCreateUserByEmail } from "./db/users";

declare module "next-auth" {
  interface Session {
    user: Awaited<ReturnType<typeof findOrCreateUserByEmail>>;
  }
}

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
      const dbUser = await findOrCreateUserByEmail(session.user.email);

      return {
        ...session,
        user: dbUser,
      };
    },
  },
});
