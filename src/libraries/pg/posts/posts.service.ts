import "server-only";
import { pageOffset, withPgConnection, withPgTransaction } from "..";
import {
  CATEGORIES_TABLE,
  IMAGES_TABLE,
  POSTS_IMAGES_TABLE,
  POSTS_TABLE,
  POSTS_TAGS_TABLE,
  TAGS_TABLE,
  USERS_TABLE,
} from "../tables";
import { TCreatePostDto, TGetPostsDto } from "./posts.dto";
import {
  addImagesQueryByTransaction,
  removeImagesQueryByTransaction,
} from "../images/images.service";
import { addTagsQueryByTransaction, removeTagsQueryByTransaction } from "../tags/tags.service";
import * as type from "./posts.type";
import * as sql from "./posts.sql";
import { ForbiddenError } from "@/libraries/error";

export const getPosts = withPgConnection(async (client, dto: TGetPostsDto) => {
  const listResult = await client.query<type.TPostListSqlResult>(sql.postListSql(dto), [
    dto.query,
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

  const posts = listResult.rows.map<type.TPublicPost>(({ categoryId, categoryName, ...post }) => {
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

export const getPublicPostById = withPgConnection(async (client, postId: number) => {
  // isPubilc이든 아니든 일단 가져와서 처리
  const postSql = `
    SELECT  T01."id"                                    AS "postId",
            T01."title"                                 AS "title",
            T01."content"                               AS "content",
            T01."view_count"                            AS "viewCount",
            T01."created_at"                            AS "createdAt",
            T01."updated_at"                            AS "updatedAt",
            T02."id"                                    AS "authorId",
            T02."email"                                 AS "email",
            T02."nickname"                              AS "nickname",
            T02."avatar"                                AS "avatar",
            COALESCE(
              ARRAY(
                SELECT T04_sub."key"
                FROM "${POSTS_IMAGES_TABLE}" T03_sub
                JOIN "${IMAGES_TABLE}" T04_sub ON T03_sub."images_id" = T04_sub."id"
                WHERE T03_sub."posts_id" = T01."id"
                ORDER BY T04_sub."id"
              ), '{}'
            ) AS "imageKeys",
            COALESCE(
              JSON_AGG(DISTINCT JSONB_BUILD_OBJECT('id', T07."id", 'name', T07."name")) FILTER (WHERE T07."id" IS NOT NULL),
              '[]'::json
            ) AS "tags",
            JSONB_BUILD_OBJECT('id', T05."id", 'name', T05."name") AS "category" 
    FROM "${POSTS_TABLE}"             T01
    LEFT JOIN "${USERS_TABLE}"        T02 ON T01."author_id"    = T02."id"
    LEFT JOIN "${POSTS_IMAGES_TABLE}" T03 ON T01."id"           = T03."posts_id"   
    LEFT JOIN "${IMAGES_TABLE}"       T04 ON T03."images_id"    = T04."id"
    LEFT JOIN "${CATEGORIES_TABLE}"   T05 ON T01."category_id"  = T05."id"
    LEFT JOIN "${POSTS_TAGS_TABLE}"   T06 ON T01."id"           = T06."posts_id"
    LEFT JOIN "${TAGS_TABLE}"         T07 ON T06."tags_id"      = T07."id"
    WHERE T01."id" = $1
      AND T01."deleted_at" IS NULL
      AND T01."is_public" = TRUE
    GROUP BY  T01."id",
              T02."id",
              T05."id"
  `;

  const postResult = await client.query<type.TPublicPost>(postSql, [postId]);

  return postResult.rows[0];
});

export const postPost = withPgTransaction(async (client, authorId: number, dto: TCreatePostDto) => {
  // tag insert
  // category insert
  const postSql = `
    INSERT INTO "${POSTS_TABLE}" ("author_id", "title", "content", "is_public", "category_id")
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `;

  const postSqlResult = await client.query<{
    id: number;
  }>(postSql, [authorId, dto.title, dto.content, dto.isPublic, dto.categoryId]);

  const postId = postSqlResult.rows[0].id;

  await addImagesQueryByTransaction(client, postId, dto.imageKeys);

  return postSqlResult.rows[0];
});

export const patchPost = withPgTransaction(
  async (client, authorId: number, postId: number, dto: TCreatePostDto) => {
    const currentPost = await getPublicPostById(postId);

    if (currentPost.authorId !== authorId) {
      throw new ForbiddenError("접근 권한이 없습니다.");
    }

    // category insert
    const postSql = `
    UPDATE "${POSTS_TABLE}"
    SET "title" = $2, "content" = $3, "is_public" = $4, "category_id" = $5
    WHERE "id" = $1
    RETURNING id
  `;

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
      client.query(postSql, [postId, dto.title, dto.content, dto.isPublic, dto.categoryId]),
      addImageList.length > 0 && addImagesQueryByTransaction(client, postId, addImageList),
      removeImageList.length > 0 && removeImagesQueryByTransaction(client, postId, removeImageList),
      addTagsList.length > 0 && addTagsQueryByTransaction(client, postId, addTagsList),
      removeTagsList.length > 0 && removeTagsQueryByTransaction(client, postId, removeTagsList),
    ]);

    return { id: postId };
  },
);

export const deletePost = withPgTransaction(async (client, postId: number) => {
  const sql = `
    -- SOFT DELETE
    UPDATE "${POSTS_TABLE}"
    SET "deleted_at" = CURRENT_TIMESTAMP, "is_public" = FALSE
    WHERE "id" = $1
    RETURNING id
  `;

  await client.query(sql, [postId]);
  return { id: postId };
});

export const increasePostViewCount = withPgConnection(async (client, postId: number) => {
  const sql = `
    UPDATE "${POSTS_TABLE}"
    SET "view_count" = "view_count" + 1
    WHERE "id" = $1
    RETURNING id
  `;

  await client.query(sql, [postId]);
  return { id: postId };
});
