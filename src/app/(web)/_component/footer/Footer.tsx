import * as css from "./footer.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div>
        <h4>footer</h4>
        <ul>
          <li>about</li>
          <li>contact</li>
          <li>link</li>
        </ul>
      </div>
    </footer>
  );
}
