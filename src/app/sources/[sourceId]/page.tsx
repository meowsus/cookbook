import Code from "@/components/Code";
import Heading from "@/components/Heading";
import Link from "@/components/Link";
import List from "@/components/List";
import { getSource } from "@/lib/db/sources";

export default async function SourcePage({
  params,
}: {
  params: Promise<{ sourceId: string }>;
}) {
  const { sourceId } = await params;

  const source = await getSource(sourceId);

  return (
    <div className="space-y-4">
      <Heading level={1}>
        Source <Code>{sourceId}</Code>
      </Heading>

      <div>
        <Link href="/sources">Back to sources</Link>
      </div>

      <List type="ul">
        <li>
          <Code>URL</Code>: {source?.url}
          {source?.url && (
            <>
              {" "}
              (
              <Link href={source.url} target="_blank">
                Visit
              </Link>
              )
            </>
          )}
        </li>
      </List>
    </div>
  );
}
