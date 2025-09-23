import Heading from "@/components/elements/Heading";
import Link from "@/components/elements/Link";
import CreateSourceForm from "./CreateSourceForm";

export default function NewSourcePage() {
  return (
    <div className="space-y-4">
      <Heading level={1}>Add new source</Heading>

      <div>
        <Link href="/sources">Back to sources</Link>
      </div>

      <p>Did you find a new recipe on the internet? Add it&apos;s url here!</p>

      <CreateSourceForm />
    </div>
  );
}
