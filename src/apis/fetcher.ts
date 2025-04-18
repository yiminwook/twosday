import ky from "ky";

const VERSION = "v1";

export const serverApi = ky.create({
  fetch: fetch,
  prefixUrl: process.env.NEXT_PUBLIC_API_URL + "/api/" + VERSION,
  hooks: {
    beforeRequest: [(request) => {}],
    beforeRetry: [],
    afterResponse: [],
    beforeError: [
      async (error) => {
        const { response } = error;
        if (!response) return error;

        try {
          const body: { message?: string } = await response.json();

          if (body?.message) {
            error.message = body.message;
          }
        } catch (parseError) {
          console.log("[SERVER] ky parseError");
        } finally {
          return error;
        }
      },
    ],
  },
});

export const clientApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL + "/api/" + VERSION,
  hooks: {
    beforeRequest: [(request) => {}],
    beforeRetry: [],
    afterResponse: [],
    beforeError: [
      async (error) => {
        const { response } = error;
        if (!response) return error;

        try {
          const body: { message?: string } = await response.json();

          if (body?.message) {
            error.message = body.message;
          }
        } catch (parseError) {
          console.log("[CLIENT] ky parseError");
        } finally {
          return error;
        }
      },
    ],
  },
});

export const revalidateApi = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL + "/api/revalidate",
  hooks: {
    beforeRequest: [(request) => {}],
    beforeRetry: [],
    afterResponse: [],
    beforeError: [
      async (error) => {
        const { response } = error;
        if (!response) return error;

        try {
          const body: { message?: string } = await response.json();

          if (body?.message) {
            error.message = body.message;
          }
        } catch (parseError) {
          console.log("[REVALIDATE] ky parseError");
        } finally {
          return error;
        }
      },
    ],
  },
});
