import { useApp } from "@/app/_lib/app";
import { useMutation } from "@tanstack/react-query";

import { useStore } from "zustand";

export const useLogoutMutation = () => {
  const store = useApp();
  const action = useStore(store, (store) => store.actions);

  const mutate = useMutation({
    mutationKey: ["/auth/logout"],
    mutationFn: async () => {
      action.logout();
      window.location.href = "/login";
    },
  });

  return mutate;
};
