export default function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-gray-700 text-white px-1 rounded-md">{children}</code>
  );
}
