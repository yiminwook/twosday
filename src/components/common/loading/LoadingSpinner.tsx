import css from "./LoadingSpinner.module.scss";

interface Props {
  style?: React.CSSProperties;
}

export default function LoadingSpinner({ style }: Props) {
  return (
    <span className={css.loader} style={style}>
      <span className="blind">로딩중</span>
    </span>
  );
}
