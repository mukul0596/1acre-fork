export const constructUrl = (url, searchParams) => {
  const resUrl = new URL(url);
  for (const [key, value] of Object.entries(searchParams)) {
    resUrl.searchParams.append(key, value);
  }
  return resUrl.toString();
};
