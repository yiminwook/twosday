export const extractYoutubeVId = (url: string) => {
  return url.match(/(?:\?v=|&v=|youtu\.be\/)([^&\n?#]+)/)?.[1].trim();
};
