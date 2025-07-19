import { UnstyledButton } from "@mantine/core";
import css from "./navigation.module.scss";

// 태그검색 링크
// 리스트 이동링크
// 레퍼런스 이동링크
// 맨위로 이동버튼
export default function Navigation() {
  return (
    <div className={css.wrap}>
      <div className={css.inner}>
        <ul className={css.list}>
          <li>
            <UnstyledButton>list1</UnstyledButton>
          </li>
          <li></li>
          <li>
            <UnstyledButton>list3</UnstyledButton>
          </li>
        </ul>
      </div>
    </div>
  );
}
