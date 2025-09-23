import NextLink from "next/link";

export default function Link({
  ...props
}: React.ComponentProps<typeof NextLink>) {
  return <NextLink {...props} className="text-blue-500 hover:text-blue-600" />;
}
