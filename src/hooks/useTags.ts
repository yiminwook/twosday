import { clientApi, revalidateApi } from "@/apis/fetcher";
import { TAG_TAG } from "@/constances";
import { TTag } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useServerTags = () => {
  const query = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const json = await clientApi.get<{ message: string; data: TTag[] }>("tags").json();
      return json.data;
    },
  });

  return query;
};

export const useManageTags = (session: Session) => {
  const queryClient = useQueryClient();

  const postTagMutation = useMutation({
    mutationFn: async (arg: { name: string; session: Session }) => {
      const json = await clientApi
        .post<{ message: string; data: { id: number } }>("tags", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${arg.session.accessToken}`,
          },
          json: {
            name: arg.name,
          },
        })
        .json();

      return json.data;
    },
    onSuccess: async (data, arg) => {
      queryClient.setQueryData(["tags"], (prev: TTag[] | undefined) => {
        if (!prev) return prev;
        return [...prev, { id: data.id, name: arg.name }];
      });
      await revalidateApi.get(`tag?name=${TAG_TAG}`);
      toast.success("태그가 추가되었습니다.");
    },
    onError: async (error) => {
      await queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.error(error.message);
    },
  });

  const removeTagMutation = useMutation({
    onMutate: async (arg) => {
      // Optimistic UI update
      queryClient.setQueryData(["tags"], (prev: TTag[] | undefined) => {
        if (!prev) return prev;
        return prev.filter((tag) => tag.id !== arg.id);
      });
      await revalidateApi.get(`tag?name=${TAG_TAG}`);
      toast.success("태그가 삭제되었습니다.");
    },
    mutationFn: async (arg: { id: number; session: Session }) => {
      const json = await clientApi
        .delete<{ message: string; data: { id: number } }>(`tags/${arg.id}`, {
          headers: {
            Authorization: `Bearer ${arg.session.accessToken}`,
          },
        })
        .json();

      return json.data;
    },
    onError: async (error) => {
      await queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.error(error.message);
    },
  });

  return {
    postTagMutation,
    removeTagMutation,
  };
};
