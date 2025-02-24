import { JSDOM } from "jsdom";

export const parseMetadata = (htmlString: string) => {
  const purifiedDOM = new JSDOM(htmlString).window.document;

  return {
    title: purifiedDOM.querySelector("title")?.textContent || "",
    description:
      purifiedDOM.querySelector("meta[name='description']")?.getAttribute("content") || "",
    thumbnail:
      purifiedDOM.querySelector("meta[property='og:image']")?.getAttribute("content") || "",
  };
};
