import { signInAction, signOutAction } from "@/lib/actions/auth";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="space-y-4">
      <h1>Home</h1>

      {session?.user && <span>Welcome, {session?.user?.email}</span>}

      {session?.user ? (
        <form action={signOutAction}>
          <button type="submit">Sign Out</button>
        </form>
      ) : (
        <form action={signInAction}>
          <button type="submit">Sign In</button>
        </form>
      )}
    </div>
  );
}
