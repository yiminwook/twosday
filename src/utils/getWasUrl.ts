export const getWasUrl = () => {
  const protocol = process.env.NEXT_PUBLIC_WAS_PROTOCOL;
  const host = process.env.NEXT_PUBLIC_WAS_HOST;
  return `${protocol}://${host}`;
};
