import Link from "next/link";
import { auth } from "@/lib/auth";
import { signInAction, signOutAction } from "@/lib/actions/auth";
import { Bars3Icon } from "@heroicons/react/24/solid";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="navbar shadow-sm pr-4 bg-base-100 rounded-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Bars3Icon className="size-5" />
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/sources">Sources</Link>
            </li>
            <li>
              <Link href="/recipes">Recipes</Link>
            </li>
          </ul>
        </div>

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
