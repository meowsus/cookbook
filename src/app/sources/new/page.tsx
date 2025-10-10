import Link from "next/link";
import CreateSourceForm from "./CreateSourceForm";
import Breadcrumbs from "@/app/Breadcrumbs";

export default function NewSourcePage() {
  return (
    <div className="grow flex flex-col gap-4">
      <Breadcrumbs pageTitle="Add a new source" />

      <div className="grow flex items-center justify-center">
        <CreateSourceForm />
      </div>
    </div>
  );
}
