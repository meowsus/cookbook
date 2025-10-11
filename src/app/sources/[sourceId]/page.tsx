import { findSourceByUser } from "@/lib/db/sources";
import { findRecipesBySource } from "@/lib/db/recipes";
import DeleteSourceForm from "../DeleteSourceForm";
import RemoveSourceFullHtmlForm from "./RemoveSourceFullHtmlForm";
import RemoveSourceProcessedHtmlForm from "./RemoveSourceProcessedHtmlForm";
import RemoveSourceExtractedRecipeForm from "./RemoveSourceExtractedRecipeForm";
import CreateRecipeForm from "@/app/recipes/new/CreateRecipeForm";
import DeleteRecipeForm from "@/app/recipes/DeleteRecipeForm";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Breadcrumbs from "@/app/Breadcrumbs";
import SourceSteps from "@/app/sources/[sourceId]/SourceSteps";
import FetchFullHtmlModal from "./FetchFullHtmlModal";
import {
  ArrowTopRightOnSquareIcon,
  HandRaisedIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";
import { cn } from "@/lib/helpers";
import ProcessHtmlModal from "./ProcessHtmlModal";
import ExtractRecipeModal from "./ExtractRecipeModal";
import Link from "next/link";

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
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 justify-between items-center">
        <Breadcrumbs pageTitle={`Editing source ${sourceId}`} />

        <DeleteSourceForm sourceId={sourceId} />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <SourceSteps source={source} />

        <div className="flex flex-col gap-2 grow">
          <div className="card card-border bg-base-100" id="url">
            <div className="card-body">
              <div className="flex items-center gap-2">
                {source.url ? (
                  <HandThumbUpIcon className="size-4 text-success" />
                ) : (
                  <HandThumbDownIcon className="size-4 text-warning" />
                )}
                <h2
                  className={cn(
                    "grow card-title",
                    source.url ? "text-success" : "text-warning",
                  )}
                >
                  Step 1: Add a URL
                </h2>
                <div className="flex items-center gap-2">
                  <a
                    href={source.url}
                    target="_blank"
                    title="Visit URL"
                    className="btn btn-ghost btn-sm"
                  >
                    <ArrowTopRightOnSquareIcon className="size-4" />
                  </a>
                </div>
              </div>
              <p>
                <code>{source.url}</code>
              </p>
            </div>
          </div>

          <div className="card card-border bg-base-100" id="fullHtml">
            <div className="card-body">
              <div className="flex items-center gap-2">
                {source.fullHtml ? (
                  <HandThumbUpIcon className="size-4 text-success" />
                ) : (
                  <HandThumbDownIcon className="size-4 text-warning" />
                )}
                <h2
                  className={cn(
                    "grow card-title",
                    source.fullHtml ? "text-success" : "text-warning",
                  )}
                >
                  Step 2: Fetch Full HTML
                </h2>
                <div className="flex items-center gap-2">
                  {source.fullHtml && (
                    <RemoveSourceFullHtmlForm sourceId={source.id} />
                  )}
                </div>
              </div>
              <p>
                {source.fullHtml ? (
                  <textarea
                    className="textarea w-full h-64"
                    value={source.fullHtml}
                    readOnly
                  />
                ) : (
                  "We'll need to fetch the full HTML from this URL to continue."
                )}
              </p>

              {!source.fullHtml && (
                <div className="card-actions justify-end">
                  <FetchFullHtmlModal sourceId={source.id} />
                </div>
              )}
            </div>
          </div>

          <div className="card card-border bg-base-100" id="processedHtml">
            <div className="card-body">
              <div className="flex items-center gap-2">
                {!source.fullHtml ? (
                  <HandRaisedIcon className="size-4 text-neutral" />
                ) : source.processedHtml ? (
                  <HandThumbUpIcon className="size-4 text-success" />
                ) : (
                  <HandThumbDownIcon className="size-4 text-warning" />
                )}
                <h2
                  className={cn(
                    "grow card-title",
                    source.processedHtml ? "text-success" : "text-warning",
                    !source.fullHtml && "text-neutral",
                  )}
                >
                  Step 3: Process HTML
                </h2>
                <div className="flex items-center gap-2">
                  {source.processedHtml && (
                    <RemoveSourceProcessedHtmlForm sourceId={source.id} />
                  )}
                </div>
              </div>
              <p>
                {source.processedHtml ? (
                  <textarea
                    className="textarea w-full h-64"
                    value={source.processedHtml}
                    readOnly
                  />
                ) : source.fullHtml ? (
                  "We'll need to process the HTML that you've just fetched to continue."
                ) : (
                  <span className="text-neutral">
                    You haven't fetched the full HTML yet.
                  </span>
                )}
              </p>

              {!source.processedHtml && source.fullHtml && (
                <div className="card-actions justify-end">
                  <ProcessHtmlModal
                    sourceId={source.id}
                    fullHtml={source.fullHtml}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="card card-border bg-base-100" id="extractedRecipe">
            <div className="card-body">
              <div className="flex items-center gap-2">
                {!source.processedHtml ? (
                  <HandRaisedIcon className="size-4 text-neutral" />
                ) : source.extractedRecipe ? (
                  <HandThumbUpIcon className="size-4 text-success" />
                ) : (
                  <HandThumbDownIcon className="size-4 text-warning" />
                )}
                <h2
                  className={cn(
                    "grow card-title",
                    source.extractedRecipe ? "text-success" : "text-warning",
                    !source.processedHtml && "text-neutral",
                  )}
                >
                  Step 4: Extract Recipe
                </h2>
                <div className="flex items-center gap-2">
                  {source.extractedRecipe && (
                    <RemoveSourceExtractedRecipeForm sourceId={source.id} />
                  )}
                </div>
              </div>
              <p>
                {source.extractedRecipe ? (
                  <textarea
                    className="textarea w-full h-64"
                    value={source.extractedRecipe}
                    readOnly
                  />
                ) : source.processedHtml ? (
                  "We'll need to extract the recipe from the processed HTML to continue."
                ) : (
                  <span className="text-neutral">
                    You haven't processed the HTML yet.
                  </span>
                )}
              </p>

              {!source.extractedRecipe && source.processedHtml && (
                <div className="card-actions justify-end">
                  <ExtractRecipeModal sourceId={source.id} />
                </div>
              )}
            </div>
          </div>

          {source?.extractedRecipe && (
            <>
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
      </div>
    </div>
  );
}
