"use client";

import { Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function NavbarDropdown() {
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // When the pathname changes, remove focus from the dropdown
    // This will trigger the CSS rules that hide the dropdown-content
    if (dropdownRef.current) {
      const activeElement = document.activeElement as HTMLElement;
      if (dropdownRef.current.contains(activeElement)) {
        activeElement.blur();
      }
    }
  }, [pathname]);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <Bars3Icon className="size-5" />
      </div>

      <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-100 rounded-b-box z-1 mt-3 w-52 p-2 shadow"
      >
        <li>
          <Link href="/sources">Sources</Link>
        </li>
        <li>
          <Link href="/recipes">Recipes</Link>
        </li>
      </ul>
    </div>
  );
}
