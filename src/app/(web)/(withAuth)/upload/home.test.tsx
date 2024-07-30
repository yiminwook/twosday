import { renderWithClient } from "@/__test__/__mock__/Config";
import Home from "./home";
import { waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mswServer } from "@/__test__/__mock__/msw";
import { http, HttpResponse } from "msw";
import { getWasUrl } from "@/app/_lib/getWasUrl";

describe("업로드 페이지 테스트", () => {
  test("업로드 페이지 렌더링 테스트", async () => {
    const fetchSpy = jest.spyOn(global, "fetch");
    window.document.execCommand = jest.fn();
    mswServer.use(
      http.post(`${getWasUrl()}/api/twosday/post`, async ({ request }) => {
        const token = request.headers.get("Authorization")?.split(" ")[1];
        const body = (await request.json()) as {
          title: string;
          content: string;
          tags: string[];
          isPublic: boolean;
          thumbnail: string;
        };

        if (token !== "accessToken") {
          return HttpResponse.json({ message: ["unauthorized"] }, { status: 401 });
        }

        if (body.title !== "title" || body.content !== "Hello, World!") {
          return HttpResponse.error();
        }

        return HttpResponse.json({ data: { id: 1 }, message: ["success"] }, { status: 201 });
      }),
    );

    const mockSession: Session = {
      id: 1,
      email: "email@naver.com",
      avartar: null,
      nickname: "nickname",
      accountType: "email",
      status: "1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      accessToken: "accessToken",
    };

    const { container } = await waitFor(() =>
      renderWithClient(<Home session={mockSession} />, { session: mockSession }),
    );

    const submitBtn = screen.getByText("저장");
    const titleInput = screen.getByPlaceholderText("제목을 입력해주세요");

    await waitFor(() => {
      const loading = screen.queryAllByText(/로딩중/i);
      loading.forEach((el) => {
        expect(el).not.toBeVisible();
      });
    });

    await userEvent.type(titleInput, "title");
    await userEvent.type(container.querySelector(".ql-editor")!, "Hello, World!");

    expect(submitBtn).toBeVisible();
    expect(titleInput).toBeVisible();
    await userEvent.click(submitBtn);

    // 성공 메시지 확인
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalled();
    });

    // fetch 응답 확인
    const fetchCalls = fetchSpy.mock.calls;
    const lastFetchCall = fetchCalls[fetchCalls.length - 1];
    const body = JSON.parse(lastFetchCall[1]!.body as string);
    expect(body.data.id).toBe(1);
    fetchSpy.mockRestore();
  });
});
