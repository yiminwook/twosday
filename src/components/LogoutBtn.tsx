import { Button } from "@mantine/core";

interface LogoutBtnProps {
  onClick: () => void;
}

export default function LogoutBtn({ onClick }: LogoutBtnProps) {
  return <Button onClick={onClick}>로그아웃</Button>;
}
