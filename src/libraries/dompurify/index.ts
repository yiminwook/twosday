import Dompurify from "dompurify";
import { JSDOM } from "jsdom";

export const vertualWindow = new JSDOM("").window;
export const serverDompurify = Dompurify(vertualWindow);

export function getPureText(htmlString: string) {
  const purifiedDOM = serverDompurify.sanitize(htmlString, {
    RETURN_DOM: true,
    ALLOWED_TAGS: [],
  });
  return purifiedDOM.textContent || "";
}
