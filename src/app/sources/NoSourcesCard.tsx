import { HandThumbDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NoSourcesCard() {
  return (
    <div className="card bg-base-100 w-96 mx-auto shadow-sm">
      <figure className="px-10 pt-10">
        <HandThumbDownIcon className="size-10 text-slate-500" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">No sources found</h2>
        <p>Go ahead and add a new source to get started.</p>
        <div className="card-actions">
          <Link href="/sources/new" className="btn btn-primary">
            New source
          </Link>
        </div>
      </div>
    </div>
  );
}
