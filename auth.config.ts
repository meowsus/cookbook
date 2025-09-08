import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    // Providers that require Node.js APIs (like Nodemailer) should be
    // configured in auth.ts, not here in the edge-compatible config
  ],
} satisfies NextAuthConfig;
