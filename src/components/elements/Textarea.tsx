export default function Textarea({
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className="w-full rounded-md border border-gray-300 p-2"
      {...props}
    />
  );
}
