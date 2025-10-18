import { auth } from "@/lib/auth";
import { findSourcesByUser } from "@/lib/db/sources";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { redirect } from "next/navigation";
import Breadcrumbs from "../Breadcrumbs";
import NoSourcesCard from "./NoSourcesCard";
import SourcesList from "./SourcesList";

export default async function SourcesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const sources = await findSourcesByUser(session.user.id);
  const hasSources = sources.length > 0;

  return (
    <div className="grow flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Breadcrumbs pageTitle="Sources" />

        <Link
          href="/sources/new"
          className="btn btn-primary btn-sm"
          title="New source"
        >
          New
          <PlusCircleIcon className="size-4" />
        </Link>
      </div>

      {hasSources ? (
        <SourcesList sources={sources} />
      ) : (
        <div className="grow flex items-center justify-center">
          <NoSourcesCard />
        </div>
      )}
    </div>
  );
}
