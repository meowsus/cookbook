import Code from "@/components/elements/Code";
import Heading from "@/components/elements/Heading";
import Link from "@/components/elements/Link";
import List from "@/components/elements/List";
import FetchSourceHtmlForm from "@/components/FetchSourceHtmlForm";
import { addSourceHtmlAction } from "@/lib/actions/sources";
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
        <li>
          <Code>HTML</Code>: {source?.html.slice(0, 100)}...
        </li>
      </List>

      {!source?.html && (
        <FetchSourceHtmlForm
          sourceId={sourceId}
          formAction={addSourceHtmlAction}
        />
      )}
    </div>
  );
}
