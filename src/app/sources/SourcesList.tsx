import { GlobeAltIcon, EyeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import DeleteSourceForm from "./DeleteSourceForm";
import SourceProgress from "./SourceProgress";
import { SourceWithRecipes } from "@/types";

interface SourcesListProps {
  sources: SourceWithRecipes[];
}

export default function SourcesList({ sources }: SourcesListProps) {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        Here are the sources that you've added so far.
      </li>

      {sources.map((source) => (
        <li className="list-row" key={source.id}>
          <div className="hidden sm:block">
            <GlobeAltIcon className="size-10 text-slate-500" />
          </div>
          <div className="flex flex-col gap-2">
            <code>{source.url}</code>
            <div className="text-xs uppercase font-semibold opacity-60">
              <SourceProgress source={source} />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-1">
            <Link
              href={`/sources/${source.id}`}
              title="View source"
              className="btn btn-square btn-ghost"
            >
              <EyeIcon className="size-4" />
            </Link>

            <DeleteSourceForm sourceId={source.id} />
          </div>
        </li>
      ))}
    </ul>
  );
}
