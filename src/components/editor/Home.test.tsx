import { renderWithClient } from "@/__test__/__mock__/Config";
import PostHome from "./PostHome";
import { waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mswServer } from "@/__test__/__mock__/msw";
import { http, HttpResponse } from "msw";
import { useRouter } from "next/navigation";

describe("업로드 페이지 테스트", () => {
  test("업로드 테스트", async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: pushMock,
    }));

    window.document.execCommand = jest.fn();

    mswServer.use(
      http.post(`${process.env.NEXT_PUBLIC_API_URL}/api/twosday/post`, async ({ request }) => {
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

        if (body.title !== "title" && body.content !== "Hello, World!") {
          return HttpResponse.error();
        }

        return HttpResponse.json({ data: { id: 1 }, message: ["success"] }, { status: 201 });
      }),
    );

    const mockSession: Session = {
      accessToken: "accessToken",
      id: 1,
      email: "email@naver.com",
      // avartar: null,
      // nickname: "nickname",
      // accountType: "email",
      // status: "1",
      // createdAt: new Date(),
      // updatedAt: new Date(),
      loginAt: new Date(),
      iss: new Date(),
    };

    const { container } = await waitFor(() =>
      renderWithClient(<PostHome />, { session: mockSession }),
    );

    const submitBtn = screen.getByText("저장");
    const titleInput = screen.getByPlaceholderText("제목을 입력해주세요");

    expect(submitBtn).toBeVisible();
    expect(titleInput).toBeVisible();

    await waitFor(() => {
      const loading = screen.queryAllByText(/로딩중/i);
      loading.forEach((el) => {
        expect(el).not.toBeVisible();
      });
    });

    await userEvent.type(titleInput, "title");
    await userEvent.type(container.querySelector(".ql-editor")!, "Hello, World!");
    await userEvent.click(submitBtn);

    expect(screen.getByText("업로드 성공")).toBeVisible();

    expect(pushMock).toHaveBeenCalled();
    const pushMockArg = pushMock.mock.calls[0][0];
    expect(pushMockArg).toBe("/posts/1");
  });
});
