import { http, HttpResponse } from "msw";

export const TEST_API_URL = "http://localhost:3000";

const contents = [
  http.get(`${TEST_API_URL}/api/v1/dummy`, (req) => {
    return HttpResponse.json({
      message: "조회되었습니다.",
      data: {
        list: [
          {
            id: 1,
            title: "스케줄 1",
            content: "스케줄 1 내용",
            start: "2022-01-01T",
            end: "2022-01-01T",
          },
        ],
      },
    });
  }),
];

export const handlers = [
  http.get(`${TEST_API_URL}/api/hello`, (req) => {
    return HttpResponse.json({
      message: "Hello World!",
    });
  }),
  ...contents,
];
