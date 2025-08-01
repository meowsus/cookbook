export default function Button({ ...props }: React.ComponentProps<"button">) {
  return (
    <button {...props} className="bg-blue-500 text-white rounded-md p-2" />
  );
}
