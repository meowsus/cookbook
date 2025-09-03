import Code from "@/components/elements/Code";
import Heading from "@/components/elements/Heading";
import Link from "@/components/elements/Link";
import FetchFullHtmlForm from "@/app/sources/[sourceId]/FetchFullHtmlForm";
import {
  updateExtractedRecipeAction,
  updateSourceFullHtmlAction,
  updateSourceProcessedHtmlAction,
  removeSourceFullHtmlAction,
  removeSourceProcessedHtmlAction,
  removeExtractedRecipeAction,
} from "@/lib/actions/sources";
import { getSource } from "@/lib/db/sources";
import ProcessedHtmlForm from "@/app/sources/[sourceId]/ProcessedHtmlForm";
import FetchExtractedRecipeForm from "@/app/sources/[sourceId]/FetchExtractedRecipeForm";
import DeleteSourceForm from "../DeleteSourceForm";
import RemoveDataForm from "./RemoveDataForm";

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

      <div className="flex items-center gap-2">
        <Link href="/sources">Back to sources</Link>
        <DeleteSourceForm sourceId={sourceId} />
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

      {source?.url && !source?.fullHtml && (
        <>
          <Heading level={3}>Fetched Source HTML</Heading>

          <p>
            We&apos;ve fetched the HTML for this source URL. Review it below,
            and if it looks like it&apos;s the right HTML, click &quot;Looks
            good!&quot; to save it.
          </p>

          <FetchFullHtmlForm
            sourceId={sourceId}
            formAction={updateSourceFullHtmlAction}
          />
        </>
      )}

      {source?.fullHtml && (
        <>
          <div className="flex items-baseline gap-2">
            <Heading level={3}>Full HTML</Heading>
            <RemoveDataForm
              sourceId={sourceId}
              formAction={removeSourceFullHtmlAction}
            />
          </div>

          <p>{source.fullHtml.slice(0, 100)}...</p>
        </>
      )}

      {source?.fullHtml && !source?.processedHtml && (
        <>
          <Heading level={3}>Processed HTML</Heading>

          <p>
            Here is the proposed processed HTML. Review it below, and if it
            looks like it&apos;s the right HTML, click &quot;Looks good!&quot;
            to save it.
          </p>

          <ProcessedHtmlForm
            sourceId={sourceId}
            value={source.fullHtml}
            formAction={updateSourceProcessedHtmlAction}
          />
        </>
      )}

      {source?.processedHtml && (
        <>
          <div className="flex items-baseline gap-2">
            <Heading level={3}>Processed HTML</Heading>

            <RemoveDataForm
              sourceId={sourceId}
              formAction={removeSourceProcessedHtmlAction}
            />
          </div>

          <p>{source.processedHtml.slice(0, 100)}...</p>
        </>
      )}

      {source?.processedHtml && !source?.extractedRecipe && (
        <>
          <Heading level={3}>Extracted Recipe</Heading>

          <p>
            We&apos;re extracting the recipe from the HTML. This could take a
            while.
          </p>

          <p>
            When it finishes, review it below, and if it looks like it&apos;s
            the right recipe, click &quot;Looks good!&quot; to save it. If it
            looks as though the model has gone haywire and you are not receiving
            a concise response, try manually editing the processed HTML, above,
            to be much shorter.
          </p>

          <FetchExtractedRecipeForm
            sourceId={sourceId}
            formAction={updateExtractedRecipeAction}
          />
        </>
      )}

      {source?.extractedRecipe && (
        <>
          <div className="flex items-baseline gap-2">
            <Heading level={3}>Extracted Recipe</Heading>

            <RemoveDataForm
              sourceId={sourceId}
              formAction={removeExtractedRecipeAction}
            />
          </div>

          <p>{source.extractedRecipe}</p>
        </>
      )}
    </div>
  );
}
