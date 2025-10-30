import NavbarDropdown from "@/app/NavbarDropdown";
import { signInAction, signOutAction } from "@/lib/actions/auth";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="navbar shadow-sm pr-4 bg-base-100 rounded-lg">
      <div className="navbar-start">
        <NavbarDropdown />

        <Link href="/" className="btn btn-ghost text-xl">
          Cookbook
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/sources">Sources</Link>
          </li>
          <li>
            <Link href="/recipes">Recipes</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        {session?.user ? (
          <form action={signOutAction}>
            <button
              type="submit"
              className="btn btn-secondary btn-outline btn-sm"
            >
              Sign Out
            </button>
          </form>
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
