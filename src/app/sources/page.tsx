import { findSourcesByUser } from "@/lib/db/sources";
import DeleteSourceForm from "./DeleteSourceForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SourcesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const sources = await findSourcesByUser(session.user.id);

  return (
    <div className="space-y-4">
      <h1>Sources</h1>

      <p>
        Sources are URLs to a specific recipe. You can add new sources{" "}
        <Link href="/sources/new">here</Link>.
      </p>

      <ul>
        {sources.map((source) => (
          <li key={source.id}>
            <code>{source.id}</code> {source.url}{" "}
            <div className="inline-flex items-center gap-2">
              <Link href={`/sources/${source.id}`}>View</Link>
              <DeleteSourceForm sourceId={source.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
