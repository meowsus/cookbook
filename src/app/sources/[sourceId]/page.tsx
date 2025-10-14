import DeleteRecipeForm from "@/app/recipes/DeleteRecipeForm";
import CreateRecipeForm from "@/app/recipes/new/CreateRecipeForm";
import DeleteSourceForm from "@/app/sources/DeleteSourceForm";
import RemoveSourceExtractedRecipeForm from "@/app/sources/[sourceId]/RemoveSourceExtractedRecipeForm";
import RemoveSourceFullHtmlForm from "@/app/sources/[sourceId]/RemoveSourceFullHtmlForm";
import RemoveSourceProcessedHtmlForm from "@/app/sources/[sourceId]/RemoveSourceProcessedHtmlForm";
import UpdateSourceExtractedRecipeForm from "@/app/sources/[sourceId]/UpdateSourceExtractedRecipeForm";
import UpdateSourceFullHtmlForm from "@/app/sources/[sourceId]/UpdateSourceFullHtmlForm";
import UpdateSourceProcessedHtmlForm from "@/app/sources/[sourceId]/UpdateSourceProcessedHtmlForm";
import { auth } from "@/lib/auth";
import { findRecipesBySource } from "@/lib/db/recipes";
import { findSourceByUser } from "@/lib/db/sources";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function SourcePage({
  params,
}: {
  params: Promise<{ sourceId: string }>;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const { sourceId } = await params;

  const source = await findSourceByUser(session.user.id, sourceId);

  if (!source) {
    notFound();
  }

  const recipes = await findRecipesBySource(session.user.id, sourceId);

  return (
    <div className="space-y-4">
      <h1>
        Source <code>{sourceId}</code>
      </h1>

      <div className="flex items-center gap-2">
        <Link href="/sources">Back to sources</Link>
        <DeleteSourceForm sourceId={sourceId} />
      </div>

      <h2>Data</h2>

      {source?.url && (
        <>
          <h3>URL</h3>

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
          <h3>Fetched Source HTML</h3>

          <p>
            We&apos;ve fetched the HTML for this source URL. Review it below,
            and if it looks like it&apos;s the right HTML, click &quot;Looks
            good!&quot; to save it.
          </p>

          <UpdateSourceFullHtmlForm sourceId={sourceId} />
        </>
      )}

      {source?.fullHtml && (
        <>
          <div className="flex items-baseline gap-2">
            <h3>Full HTML</h3>
            <RemoveSourceFullHtmlForm sourceId={sourceId} />
          </div>

          <p>{source.fullHtml.slice(0, 100)}...</p>
        </>
      )}

      {source?.fullHtml && !source?.processedHtml && (
        <>
          <h3>Processed HTML</h3>

          <p>
            Here is the proposed processed HTML. Review it below, and if it
            looks like it&apos;s the right HTML, click &quot;Looks good!&quot;
            to save it.
          </p>

          <UpdateSourceProcessedHtmlForm
            sourceId={sourceId}
            value={source.fullHtml}
          />
        </>
      )}

      {source?.processedHtml && (
        <>
          <div className="flex items-baseline gap-2">
            <h3>Processed HTML</h3>
            <RemoveSourceProcessedHtmlForm sourceId={sourceId} />
          </div>

          <p>{source.processedHtml.slice(0, 100)}...</p>
        </>
      )}

      {source?.processedHtml && !source?.extractedRecipe && (
        <>
          <h3>Extracted Recipe</h3>

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

          <UpdateSourceExtractedRecipeForm sourceId={sourceId} />
        </>
      )}

      {source?.extractedRecipe && (
        <>
          <div className="flex items-baseline gap-2">
            <h3>Extracted Recipe</h3>
            <RemoveSourceExtractedRecipeForm sourceId={sourceId} />
          </div>

          <p>{source.extractedRecipe}</p>

          <h3>Create Recipe Entry From Extracted Recipe</h3>
          <CreateRecipeForm
            sourceId={source.id}
            recipeContent={source.extractedRecipe}
          />
        </>
      )}

      {recipes?.length > 0 && (
        <>
          <h3>Saved Recipes</h3>
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe.id}>
                {recipe.name} <code>{recipe.id}</code>{" "}
                <div className="inline-flex items-center gap-2">
                  <Link href={`/recipes/${recipe.id}`}>View Recipe</Link>{" "}
                  <DeleteRecipeForm recipeId={recipe.id} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
