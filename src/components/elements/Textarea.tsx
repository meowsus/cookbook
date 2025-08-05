export default function Textarea({
  value,
  onChange,
  readOnly,
  ...props
}: React.ComponentProps<"textarea"> & {
  value: string;
  onChange?: (value: string) => void;
}) {
  const textareaProps: React.ComponentProps<"textarea"> = {
    value: value ?? "",
    className: "w-full rounded-md border border-gray-300 p-2",
    readOnly,
    ...props,
  };

  // Only add onChange handler if not read-only
  if (!readOnly && onChange) {
    textareaProps.onChange = (e) => onChange(e.target.value);
  }

  return <textarea {...textareaProps} />;
}
