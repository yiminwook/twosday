import { loader } from "./loadingSpinner.css";

interface Props {
  style?: React.CSSProperties;
}

export default function LoadingSpinner({ style }: Props) {
  return (
    <span className={loader} style={style}>
      <span className="blind">로딩중</span>
    </span>
  );
}
