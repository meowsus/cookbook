export default function RemoveDataForm({
  sourceId,
  formAction,
}: {
  sourceId: string | number;
  formAction: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={formAction}>
      <input type="hidden" name="sourceId" value={sourceId} />
      <button
        type="submit"
        className="text-red-500 hover:text-red-600 cursor-pointer"
      >
        Remove
      </button>
    </form>
  );
}
