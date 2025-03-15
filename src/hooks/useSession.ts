import { useQuery } from "@tanstack/react-query";

export const useSession = () => {
  const query = useQuery({
    queryKey: ["session"],
    queryFn: () =>
      fetch("/api/v1/auth/session", { credentials: "include" }).then(
        (res) =>
          res.json() as Promise<{
            message: string;
            session: Session | null;
          }>,
      ),
  });

  return query;
};
