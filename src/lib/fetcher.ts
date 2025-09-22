export default async function fetcher(...args: Parameters<typeof fetch>) {
  return fetch(...args).then(async (res) => {
    const data = await res.json();

    if (!res.ok) {
      // Throw the parsed error data so SWR can catch it
      throw data;
    }

    return data;
  });
}
