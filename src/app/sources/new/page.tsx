import Heading from "@/components/Heading";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { createSourceAction } from "@/lib/actions/sources";
import Link from "@/components/Link";

export default function NewSourcePage() {
  return (
    <div className="space-y-4">
      <Heading level={1}>Add new source</Heading>

      <div>
        <Link href="/sources">Back to sources</Link>
      </div>

      <p>Did you find a new recipe on the internet? Add it&apos;s url here!</p>

      <form action={createSourceAction}>
        <div className="flex gap-2">
          <Input name="url" type="text" placeholder="https://example.com" />
          <Button type="submit">Add</Button>
        </div>
      </form>
    </div>
  );
}
