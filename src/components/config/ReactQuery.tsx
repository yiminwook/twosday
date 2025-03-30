"use client";
import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryCache, QueryClientProvider } from "@tanstack/react-query";
import ErrorModal from "@/components/common/modal/ErrorModal";
import { useSetModalStore } from "@/stores/modalStore";
import { toast } from "sonner";

const checkSessionOutCode = (error: Error) => {
  return ["Invalid authorization"].includes(error.message);
};

export default function ReactQuery({ children }: PropsWithChildren) {
  const modalStore = useSetModalStore();

  const [querClient] = useState(() => {
    return new QueryClient({
      queryCache: new QueryCache({
        async onError(error, query) {
          const querykey = query.queryKey;
          if (querykey.includes("ignore")) return;

          if (error instanceof Error) {
            if (checkSessionOutCode(error)) {
              toast.warning("세션이 만료되었습니다. 잠시후 다시시도 해주세요.");
              await querClient.invalidateQueries({ queryKey: ["session"] });
              return;
            }
          }

          // await 하지않음
          modalStore.push(ErrorModal, { props: { error }, id: "rqClient-error" });
        },
      }),
      defaultOptions: {
        queries: {
          gcTime: 30 * 1000, // 30초
          staleTime: 10 * 1000, // 10초
          refetchOnWindowFocus: false,
          retry: (failureCount, error) => {
            // failureCount 0부터 시작
            if (error instanceof Error) {
              if (checkSessionOutCode(error)) {
                // 세션에러일 경우 재시도 하지 않음
                return false;
              }
            }
            // 그 외의 경우 재시도 횟수를 3으로 설정
            return failureCount < 2;
          },
          retryDelay: 1000 * 2,
        },
        mutations: {
          gcTime: 0,
          retry: false,
          onError: async (error) => {
            if (error instanceof Error) {
              if (checkSessionOutCode(error)) {
                toast.warning("세션이 만료되었습니다. 잠시후 다시시도 해주세요.");
                await querClient.invalidateQueries({ queryKey: ["session"] });
                return;
              }
            }

            // await 하지않음
            modalStore.push(ErrorModal, { props: { error }, id: "rqClient-error" });
          },
        },
      },
    });
  });

  return <QueryClientProvider client={querClient}>{children}</QueryClientProvider>;
}
