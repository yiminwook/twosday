export const excuteThumnail = (value: string) => {
  const regex = /<img[^>]*src=['"]([^'"]*)['"]/i;
  const match = value.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
};
