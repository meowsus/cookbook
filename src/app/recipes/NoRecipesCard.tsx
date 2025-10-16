import { HandThumbDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function NoRecipesCard() {
  return (
    <div className="card bg-base-100 w-96 mx-auto shadow-sm">
      <figure className="px-10 pt-10">
        <HandThumbDownIcon className="size-10 text-slate-500" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">No recipes found</h2>
        <p>
          To add a new recipe, you'll need to complete source extraction first.
        </p>
        <div className="card-actions">
          <Link href="/sources" className="btn btn-primary">
            View sources
          </Link>
        </div>
      </div>
    </div>
  );
}
