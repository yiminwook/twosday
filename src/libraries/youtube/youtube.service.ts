import { google } from "googleapis";
import { NotFoundError } from "../error";

export const youtubeService = google.youtube("v3");

export const getYoutubeInfoByVId = async (videoId: string) => {
  const response = await youtubeService.videos.list({
    part: ["id", "snippet", "statistics"],
    id: [videoId],
    key: process.env.GOOGLE_API_KEY,
  });

  const item = response.data.items?.[0];

  if (!item) {
    throw new NotFoundError(`${videoId} 해당하는 영상을 찾을 수 없습니다.`);
  }

  return {
    url: `https://www.youtube.com/watch?v=${videoId}`,
    title: item.snippet?.title || "",
    description: item.snippet?.description?.replaceAll("\n", " ") || "",
    thumbnail: item.snippet?.thumbnails?.medium?.url || "",
  };
};
