import { backdrop } from "@/components/common/backdrop.css";

interface BackdropProps {
  onClick?: () => void;
}

export default function Backdrop({ onClick }: BackdropProps) {
  return <div className={backdrop} onClick={onClick} />;
}
