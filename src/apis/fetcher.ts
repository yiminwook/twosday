import ky from "ky";

const VERSION = "v1";

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
          console.log("ky parseError");
        } finally {
          return error;
        }
      },
    ],
  },
});
