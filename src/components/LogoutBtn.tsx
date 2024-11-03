"use client";

import { Button } from "@mantine/core";

export default function LogoutBtn() {
  const onClick = () => {
    document.cookie = "refresh_token=; Max-age=0; path=/;";
    window.location.reload();
  };

  return <Button onClick={onClick}>로그아웃</Button>;
}
