import "server-only";
import { pageOffset, withPgConnection, withPgTransaction } from "..";
import { TCreatePostDto, TGetPostsDto } from "./posts.dto";
import {
  addImagesQueryByTransaction,
  removeImagesQueryByTransaction,
} from "../images/images.service";
import { addTagsQueryByTransaction, removeTagsQueryByTransaction } from "../tags/tags.service";
import * as type from "./posts.type";
import * as sql from "./posts.sql";
import { ForbiddenError } from "@/libraries/error";

export const getPosts = withPgConnection(async (client, dto: TGetPostsDto, isPublic: boolean) => {
  const listResult = await client.query<type.TPostSqlResult>(sql.postListSql(dto), [
    dto.query,
    isPublic,
    pageOffset(dto.page, dto.size),
    dto.size,
  ]);

  const postIds = listResult.rows.map((post) => post.postId);

  const [imagesResult, tagsResult, countResult] = await Promise.all([
    client.query<type.TPostImageSqlResult>(sql.postImagesSql(postIds)),
    client.query<type.TPostTagSqlResult>(sql.postTagsSql(postIds)),
    client.query<type.TPostCountSqlResult>(sql.postCountSql, [dto.query]),
  ]);

  const imageMap = new Map<number, string[]>();
  const tagMap = new Map<number, { id: number; name: string }[]>();

  imagesResult.rows.forEach((image) => {
    const keys = imageMap.get(image.postId) || [];
    keys.push(image.imageKey);
    imageMap.set(image.postId, keys);
  });

  tagsResult.rows.forEach((tag) => {
    const tags = tagMap.get(tag.postId) || [];
    tags.push({ id: tag.tagId, name: tag.tagName });
    tagMap.set(tag.postId, tags);
  });

  const posts = listResult.rows.map<type.TPost>(({ categoryId, categoryName, ...post }) => {
    return {
      ...post,
      imageKeys: imageMap.get(post.postId) || [],
      tags: tagMap.get(post.postId) || [],
      category: { id: categoryId, name: categoryName },
    };
  });

  return {
    posts,
    total: countResult.rows[0].count,
  };
});

export const getAuthorPosts = withPgConnection(
  async (client, authorId: number, dto: TGetPostsDto) => {
    const listResult = await client.query<type.TPostSqlResult>(sql.authorPostListSql(dto), [
      dto.query,
      authorId,
      pageOffset(dto.page, dto.size),
      dto.size,
    ]);

    const postIds = listResult.rows.map((post) => post.postId);

    const [imagesResult, tagsResult, countResult] = await Promise.all([
      client.query<type.TPostImageSqlResult>(sql.postImagesSql(postIds)),
      client.query<type.TPostTagSqlResult>(sql.postTagsSql(postIds)),
      client.query<type.TPostCountSqlResult>(sql.postCountSql, [dto.query]),
    ]);

    const imageMap = new Map<number, string[]>();
    const tagMap = new Map<number, { id: number; name: string }[]>();

    imagesResult.rows.forEach((image) => {
      const keys = imageMap.get(image.postId) || [];
      keys.push(image.imageKey);
      imageMap.set(image.postId, keys);
    });

    tagsResult.rows.forEach((tag) => {
      const tags = tagMap.get(tag.postId) || [];
      tags.push({ id: tag.tagId, name: tag.tagName });
      tagMap.set(tag.postId, tags);
    });

    const posts = listResult.rows.map<type.TPost>(({ categoryId, categoryName, ...post }) => {
      return {
        ...post,
        imageKeys: imageMap.get(post.postId) || [],
        tags: tagMap.get(post.postId) || [],
        category: { id: categoryId, name: categoryName },
      };
    });

    return {
      posts,
      total: countResult.rows[0].count,
    };
  },
);

export const getPostById = withPgConnection(
  async (client, postId: number, publicTp: "TRUE" | "FALSE" | "ALL") => {
    const [postResult, imagesResult, tagsResult] = await Promise.all([
      client.query<type.TPostSqlResult>(sql.postDetailSql(publicTp), [postId]),
      client.query<type.TPostImageSqlResult>(sql.postImagesSql([postId])),
      client.query<type.TPostTagSqlResult>(sql.postTagsSql([postId])),
    ]);

    const imageMap = new Map<number, string[]>();
    const tagMap = new Map<number, { id: number; name: string }[]>();

    imagesResult.rows.forEach((image) => {
      const keys = imageMap.get(image.postId) || [];
      keys.push(image.imageKey);
      imageMap.set(image.postId, keys);
    });

    tagsResult.rows.forEach((tag) => {
      const tags = tagMap.get(tag.postId) || [];
      tags.push({ id: tag.tagId, name: tag.tagName });
      tagMap.set(tag.postId, tags);
    });

    const posts = postResult.rows.map<type.TPost>(({ categoryId, categoryName, ...post }) => {
      return {
        ...post,
        imageKeys: imageMap.get(post.postId) || [],
        tags: tagMap.get(post.postId) || [],
        category: { id: categoryId, name: categoryName },
      };
    });

    return posts[0];
  },
);

export const getAuthorPostById = withPgConnection(
  async (client, postId: number, authorId: number) => {
    const [postResult, imagesResult, tagsResult] = await Promise.all([
      client.query<type.TPostSqlResult>(sql.authorPostDetailSql, [postId, authorId]),
      client.query<type.TPostImageSqlResult>(sql.postImagesSql([postId])),
      client.query<type.TPostTagSqlResult>(sql.postTagsSql([postId])),
    ]);

    const imageMap = new Map<number, string[]>();
    const tagMap = new Map<number, { id: number; name: string }[]>();

    imagesResult.rows.forEach((image) => {
      const keys = imageMap.get(image.postId) || [];
      keys.push(image.imageKey);
      imageMap.set(image.postId, keys);
    });

    tagsResult.rows.forEach((tag) => {
      const tags = tagMap.get(tag.postId) || [];
      tags.push({ id: tag.tagId, name: tag.tagName });
      tagMap.set(tag.postId, tags);
    });

    const posts = postResult.rows.map<type.TPost>(({ categoryId, categoryName, ...post }) => {
      return {
        ...post,
        imageKeys: imageMap.get(post.postId) || [],
        tags: tagMap.get(post.postId) || [],
        category: { id: categoryId, name: categoryName },
      };
    });

    return posts[0];
  },
);

/** 생성시 트랜잭션 처리 */
export const postPost = withPgTransaction(async (client, authorId: number, dto: TCreatePostDto) => {
  const postSqlResult = await client.query<{
    id: number;
  }>(sql.postCreateSql, [authorId, dto.title, dto.content, dto.isPublic, dto.categoryId]);

  const postId = postSqlResult.rows[0].id;

  await Promise.all([
    addImagesQueryByTransaction(client, postId, dto.imageKeys),
    addTagsQueryByTransaction(client, postId, dto.tagIds),
  ]);

  return postSqlResult.rows[0];
});

/** 수정시 트랜잭션 처리 */
export const patchPost = withPgTransaction(
  async (client, authorId: number, postId: number, dto: TCreatePostDto) => {
    const currentPost = await getPostById(postId, "ALL"); // public 여부에 상관없이 가져온다.

    if (currentPost.authorId !== authorId) {
      throw new ForbiddenError("접근 권한이 없습니다.");
    }

    const currentTagIds = currentPost.tags.map((tag) => tag.id);
    const currentTagIdSet = new Set(currentTagIds);
    const currentImageKeySet = new Set(currentPost.imageKeys);

    const newImageKeySet = new Set(dto.imageKeys);
    const newTagIdSet = new Set(dto.tagIds);

    const addImageList = dto.imageKeys.filter((key) => !currentImageKeySet.has(key));
    const removeImageList = currentPost.imageKeys.filter((key) => !newImageKeySet.has(key));

    const addTagsList = dto.tagIds.filter((id) => !currentTagIdSet.has(id));
    const removeTagsList = currentTagIds.filter((id) => !newTagIdSet.has(id));

    await Promise.all([
      client.query(sql.postUpdateSql, [
        postId,
        dto.title,
        dto.content,
        dto.isPublic,
        dto.categoryId,
      ]),
      addImagesQueryByTransaction(client, postId, addImageList),
      removeImagesQueryByTransaction(client, postId, removeImageList),
      addTagsQueryByTransaction(client, postId, addTagsList),
      removeTagsQueryByTransaction(client, postId, removeTagsList),
    ]);

    return { id: postId };
  },
);

export const deletePost = withPgTransaction(async (client, postId: number) => {
  await client.query(sql.postDeleteSql, [postId]);
  return { id: postId };
});

export const increasePostViewCount = withPgConnection(async (client, postId: number) => {
  await client.query(sql.postIncreaseViewCountSql, [postId]);
  return { id: postId };
});
