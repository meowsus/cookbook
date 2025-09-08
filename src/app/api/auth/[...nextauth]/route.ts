import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;

// Force this route to use Node.js runtime instead of Edge runtime
export const runtime = "nodejs";
