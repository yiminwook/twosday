import ky from "ky";

export const clientApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [(request) => {}],
    beforeRetry: [],
    afterResponse: [],
    beforeError: [],
  },
});
