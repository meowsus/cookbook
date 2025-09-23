export default function List({
  children,
  type = "ul",
}: {
  children: React.ReactNode;
  type?: "ul" | "ol";
}) {
  return (
    <>
      {type === "ul" ? (
        <ul className="list-disc list-inside">{children}</ul>
      ) : (
        <ol className="list-decimal list-inside">{children}</ol>
      )}
    </>
  );
}
