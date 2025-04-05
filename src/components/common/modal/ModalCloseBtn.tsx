import { ActionIcon } from "@mantine/core";
import { X } from "lucide-react";

export default function ModalCloseBtn({ onClose }: { onClose: () => void }) {
  return (
    <ActionIcon variant="subtle" onClick={onClose}>
      <X />
    </ActionIcon>
  );
}
