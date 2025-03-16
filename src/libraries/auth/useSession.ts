import { QueryFunction, useQuery, UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { clientApi } from "@/apis/fetcher";
import { Promised } from "@/types";

const queryKey = ["session"] as const;
type SessionFnData = Promised<typeof fetchSession>;

const fetchSession: QueryFunction<Session | null, typeof queryKey, never> = async () => {
  const res = await clientApi.get("api/v1/auth/session", {
    method: "GET",
    credentials: "include",
  });

  const json: {
    message: string;
    session: Session | null;
  } = await res.json();

  if (!res.ok) throw new Error(json.message);

  return json.session;
};

const queryOptions: UseQueryOptions<SessionFnData, Error, SessionFnData, typeof queryKey> = {
  queryKey,
  queryFn: fetchSession,
  refetchOnReconnect: true,
  staleTime: 1000 * 60 * 60 * 1, // 1 hour
  gcTime: 1000 * 60 * 60 * 3, // 3 hours
};

export const useSession = () => useQuery(queryOptions);
export const useSuspenseSession = () => useSuspenseQuery(queryOptions);
