import Heading from "@/components/elements/Heading";
import List from "@/components/elements/List";
import { getSources } from "@/lib/db/sources";
import Link from "@/components/elements/Link";
import Code from "@/components/elements/Code";
import DeleteSourceForm from "./DeleteSourceForm";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function SourcesPage() {
  const session = await auth();

  if (!session) {
    notFound();
  }

  const sources = await getSources();

  return (
    <div className="space-y-4">
      <Heading level={1}>Sources</Heading>
      <p>
        Sources are URLs to a specific recipe. You can add new sources{" "}
        <Link href="/sources/new">here</Link>.
      </p>
      <List type="ul">
        {sources.map((source) => (
          <li key={source.id}>
            <Code>{source.id}</Code> {source.url}{" "}
            <div className="inline-flex items-center gap-2">
              <Link href={`/sources/${source.id}`}>View</Link>
              <DeleteSourceForm sourceId={source.id} />
            </div>
          </li>
        ))}
      </List>
    </div>
  );
}
