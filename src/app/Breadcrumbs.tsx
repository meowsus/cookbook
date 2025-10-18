"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbsProps {
  pageTitle: React.ReactNode;
}

export default function Breadcrumbs({ pageTitle }: BreadcrumbsProps) {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((path) => path);

  const breadcrumbs = pathnames.slice(0, -1).map((name, index) => ({
    href: `/${pathnames.slice(0, index + 1).join("/")}`,
    name: name.charAt(0).toUpperCase() + name.slice(1),
  }));

  if (pathnames.length > 0) {
    breadcrumbs.unshift({ href: "/", name: "Home" });
  }

  return (
    <div className="breadcrumbs">
      <ul className="pl-0">
        {breadcrumbs.map(({ href, name }, index) => (
          <li key={index}>
            <Link href={href}>{name}</Link>
          </li>
        ))}
        <li>
          <h1>{pageTitle}</h1>
        </li>
      </ul>
    </div>
  );
}
