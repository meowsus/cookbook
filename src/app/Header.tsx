import Link from "next/link";
import { auth } from "@/lib/auth";
import { signInAction, signOutAction } from "@/lib/actions/auth";

export default async function Header() {
  const session = await auth();

  return (
    <header className="navbar shadow-sm pr-4 bg-base-100 rounded-lg">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Cookbook
        </Link>
      </div>

      <div className="flex gap-2 items-center">
        {session?.user ? (
          <>
            <ul className="menu menu-horizontal">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/sources">Sources</Link>
              </li>
            </ul>
            <form action={signOutAction}>
              <button
                type="submit"
                className="btn btn-secondary btn-outline btn-sm"
              >
                Sign Out
              </button>
            </form>
          </>
        ) : (
          <form action={signInAction}>
            <button
              type="submit"
              className="btn btn-secondary btn-outline btn-sm"
            >
              Sign In
            </button>
          </form>
        )}
      </div>
    </header>
  );
}
