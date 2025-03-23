import { UnstyledButton } from "@mantine/core";
import css from "./Navigation.module.scss";

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
