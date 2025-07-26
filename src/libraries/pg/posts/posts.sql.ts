import "server-only";
import * as tables from "../tables";
import { TGetPostsDto } from "./posts.dto";

export const postListSql = (dto: TGetPostsDto) => {
  const orderBy =
    dto.order === "popular"
      ? `ORDER BY T01."created_at" DESC, T01."view_count" DESC`
      : `ORDER BY T01."created_at" DESC`;

  return `
      SELECT
        T01."id" AS "postId",
        T01."title",
        T01."view_count" AS "viewCount",
        T01."created_at" AS "createdAt",
        T01."updated_at" AS "updatedAt",
        T01."content" AS "content",
        T02."id" AS "authorId",
        T02."email",
        T02."nickname",
        T02."avatar",
        T05."id" AS "categoryId",
        T05."name" AS "categoryName"
      FROM "${tables.POSTS_TABLE}" T01
      LEFT JOIN "${tables.USERS_TABLE}" T02 ON T01."author_id" = T02."id"
      LEFT JOIN "${tables.CATEGORIES_TABLE}" T05 ON T01."category_id" = T05."id"
      WHERE LOWER(T01."title") LIKE LOWER('%' || $1 || '%')
        AND T01."deleted_at" IS NULL
        AND T01."is_public" = TRUE
      ${orderBy}
      OFFSET $2 ROWS FETCH NEXT $3 ROWS ONLY;
    `;
};

export const postImagesSql = (postIds: number[]) => `
  SELECT
    T01."posts_id" AS "postId",
    T02."key" AS "imageKey"
  FROM "${tables.POSTS_IMAGES_TABLE}" T01
  JOIN "${tables.IMAGES_TABLE}" T02 ON T01."images_id" = T02."id"
  WHERE T01."posts_id" IN (${postIds.join(",")})
`;

export const postTagsSql = (postIds: number[]) => `
  SELECT
    T01."posts_id" AS "postId",
    T02."id" AS "tagId",
    T02."name" AS "tagName"
  FROM "${tables.POSTS_TAGS_TABLE}" T01
  JOIN "${tables.TAGS_TABLE}" T02 ON T01."tags_id" = T02."id"
  WHERE T01."posts_id" IN (${postIds.join(",")})
`;

export const postCountSql = `
  SELECT COUNT(DISTINCT T01."id") as "count"
  FROM "${tables.POSTS_TABLE}" T01
  WHERE LOWER(T01."title") LIKE LOWER('%' || $1 || '%')
    AND T01."deleted_at" IS NULL
    AND T01."is_public" = TRUE
`;
