import { deleteSourceAction } from "@/lib/actions/sources";

export default function DeleteSourceForm({
  sourceId,
}: {
  sourceId: string | number;
}) {
  return (
    <form action={deleteSourceAction}>
      <input type="hidden" name="sourceId" value={sourceId} />

      <button
        type="submit"
        className="text-red-500 hover:text-red-600 cursor-pointer"
      >
        Delete
      </button>
    </form>
  );
}
