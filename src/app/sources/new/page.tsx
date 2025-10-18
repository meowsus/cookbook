import Breadcrumbs from "@/app/Breadcrumbs";
import CreateSourceForm from "@/app/sources/new/CreateSourceForm";

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
