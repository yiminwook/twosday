import { renderHook } from "@testing-library/react";
import { useSinglePage } from "./useSinglePage";
import { act } from "react-dom/test-utils";

describe("useSinglePage hook test", () => {
  test("페이지 이동 테스트", () => {
    const { result } = renderHook(() => useSinglePage({ start: 0, max: 3 }));

    act(() => result.current.nextPage());
    expect(result.current.page).toBe(1);

    act(() => {
      result.current.nextPage();
      result.current.nextPage();
    });
    expect(result.current.page).toBe(3);

    act(() => result.current.prevPage());
    expect(result.current.page).toBe(2);

    act(() => {
      result.current.setPage(1);
    });
    expect(result.current.page).toBe(1);
  });

  test("페이지 최대 최소 검증 테스트", () => {
    const { result } = renderHook(() => useSinglePage({ start: 1, max: 3 }));

    act(() => {
      result.current.setPage(5);
      result.current.nextPage();
    });
    expect(result.current.page).toBe(3);

    act(() => {
      result.current.setPage(-1);
      result.current.prevPage();
    });
    expect(result.current.page).toBe(1);
  });

  test("페이지 초기화 테스트", () => {
    const { result } = renderHook(() => useSinglePage({ start: 5, max: 10 }));

    act(() => {
      result.current.setPage(7);
      result.current.resetPage();
    });
    expect(result.current.page).toBe(5);
  });
});
