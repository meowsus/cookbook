import Heading from "@/components/elements/Heading";
import List from "@/components/elements/List";
import { getSources } from "@/lib/db/sources";
import Link from "@/components/elements/Link";
import Code from "@/components/elements/Code";

export default async function SourcesPage() {
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
            <Link href={`/sources/${source.id}`}>View</Link>
          </li>
        ))}
      </List>
    </div>
  );
}
