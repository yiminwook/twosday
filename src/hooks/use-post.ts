import { clientApi } from "@/apis/fetcher";
import { TGetPostResponse } from "@/libraries/pg/posts/posts.type";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

export const useAuthorPostSuspenseQuery = (args: { session: Session; postId: number }) =>
  useSuspenseQuery({
    queryKey: ["author-post", args.postId, args.session],
    queryFn: async () => {
      const json = await clientApi
        .get<TGetPostResponse>(`posts/${args.postId}/author`, {
          headers: { Authorization: `Bearer ${args.session.accessToken}` },
        })
        .json();

      return json.data;
    },
  });

export const usePostCreateMutation = () =>
  useMutation({
    mutationFn: async (args: {
      title: string;
      content: string;
      imageKeys: string[];
      tagIds: number[];
      session: Session;
    }) => {
      const json = await clientApi
        .post<{ data: { id: number }; message: string }>("posts", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${args.session.accessToken}`,
          },
          json: {
            title: args.title,
            content: args.content,
            tagIds: args.tagIds,
            imageKeys: args.imageKeys,
            categoryId: null,
            isPublic: true,
          },
        })
        .json();

      return json.data;
    },
  });

export const usePostUpdateMutation = () =>
  useMutation({
    mutationFn: async (args: {
      postId: number;
      title: string;
      content: string;
      imageKeys: string[];
      tagIds: number[];
      session: Session;
    }) => {
      const json = await clientApi
        .patch<{ data: { id: number }; message: string }>("posts/" + args.postId, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${args.session.accessToken}`,
          },
          json: {
            title: args.title,
            content: args.content,
            tagIds: args.tagIds,
            imageKeys: args.imageKeys,
            categoryId: null,
            isPublic: true,
          },
        })
        .json();

      return json.data;
    },
  });
