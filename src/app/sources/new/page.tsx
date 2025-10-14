import CreateSourceForm from "@/app/sources/new/CreateSourceForm";
import Link from "next/link";

export default function NewSourcePage() {
  return (
    <div className="space-y-4">
      <h1>Add new source</h1>

      <div>
        <Link href="/sources">Back to sources</Link>
      </div>

      <p>Did you find a new recipe on the internet? Add it&apos;s url here!</p>

      <CreateSourceForm />
    </div>
  );
}
