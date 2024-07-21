import Content from "./Content";
import * as css from "./page.css";

export default async function Page() {
  return (
    <main className={css.main}>
      <div className={css.inner}>
        <h1 className={css.title}>이메일 회원가입</h1>
        <Content />
      </div>
    </main>
  );
}
