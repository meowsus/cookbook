import Link from "next/link";
import CreateSourceForm from "./CreateSourceForm";
import Breadcrumbs from "@/app/Breadcrumbs";

export default function NewSourcePage() {
  return (
    <div className="space-y-4">
      <Breadcrumbs pageTitle="Add new source" />

      <p>Did you find a new recipe on the internet? Add it&apos;s url here!</p>

      <CreateSourceForm />
    </div>
  );
}
