import { Button } from "@/components/ui/button";
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
          <Button type="submit">Sign Out</Button>
        </form>
      ) : (
        <form action={signInAction}>
          <Button type="submit">Sign In</Button>
        </form>
      )}
    </div>
  );
}
