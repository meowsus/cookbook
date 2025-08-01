export default function Input({ ...props }: React.ComponentProps<"input">) {
  return <input {...props} className="border border-gray-300 rounded-md p-2" />;
}
