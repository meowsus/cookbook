import Breadcrumbs from "@/app/Breadcrumbs";
import NoSourcesCard from "@/app/sources/NoSourcesCard";
import SourcesList from "@/app/sources/SourcesList";
import { auth } from "@/lib/auth";
import { findSourcesWithRecipesByUser } from "@/lib/db/sources";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SourcesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const sourcesWithRecipes = await findSourcesWithRecipesByUser(
    session.user.id,
  );

  const hasSources = sourcesWithRecipes.length > 0;

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
        <SourcesList sources={sourcesWithRecipes} />
      ) : (
        <div className="grow flex items-center justify-center">
          <NoSourcesCard />
        </div>
      )}
    </div>
  );
}
