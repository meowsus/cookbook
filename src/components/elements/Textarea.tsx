export default function Textarea({
  value,
  onChange,
  ...props
}: React.ComponentProps<"textarea"> & {
  value: string;
  onChange?: (value: string) => void;
}) {
  return (
    <textarea
      value={value ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full rounded-md border border-gray-300 p-2"
      {...props}
    />
  );
}
