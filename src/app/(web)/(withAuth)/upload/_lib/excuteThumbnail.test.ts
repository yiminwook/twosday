import { excuteThumnail } from "./excuteThumbnail";

describe("이미지 썸네일 추출 테스트", () => {
  test("정규표현식 검증", () => {
    const case1 = "<p>123</p>";
    expect(excuteThumnail(case1)).toBe(null);

    const case2 = "<p>123</p><img src='https://test.com/test.jpg' />";
    expect(excuteThumnail(case2)).toBe("https://test.com/test.jpg");

    const case3 = "<p>123</p><img src='http://test.com/test.jpg' />";
    expect(excuteThumnail(case3)).toBe("http://test.com/test.jpg");

    const case4 = `<p>123</p><img src='https://test.com/test.jpg' />`;
    expect(excuteThumnail(case4)).toBe("https://test.com/test.jpg");

    const case5 = `<p>123</p><img src='https://test.com/test.jpg' /><img src='https://test.com/test2.jpg' />`;
    expect(excuteThumnail(case5)).toBe("https://test.com/test.jpg");
  });
});
