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

      <Heading level={2}>Data</Heading>

      {source?.url && (
        <>
          <Heading level={3}>URL</Heading>

          <div className="space-x-2">
            {source.url}{" "}
            <Link href={source.url} target="_blank">
              Visit
            </Link>
          </div>
        </>
      )}

      {source?.url && !source?.html && (
        <>
          <Heading level={3}>Fetched Source HTML</Heading>

          <p>
            We&apos;ve fetched the HTML for this source URL. Review it below,
            and if it looks like it&apos;s the right HTML, click &quot;Looks
            good!&quot; to save it.
          </p>

          <FetchSourceHtmlForm
            sourceId={sourceId}
            formAction={addSourceHtmlAction}
          />
        </>
      )}

      {source?.html && (
        <>
          <Heading level={3}>HTML</Heading>
          <p>{source.html.slice(0, 100)}...</p>
        </>
      )}
    </div>
  );
}
