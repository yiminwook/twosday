import "server-only";
import * as tables from "../tables";
import { TGetPostsDto } from "./posts.dto";
import { InternalServerError } from "@/libraries/error";

/**
 * $1: postId
 * $2: isPublic
 */
export const postDetailSql = (publicTp: "TRUE" | "FALSE" | "ALL") => {
  let isPublicCondition: string;

  switch (publicTp) {
    case "TRUE":
      isPublicCondition = `AND T01."is_public" = TRUE`;
      break;
    case "FALSE":
      isPublicCondition = `AND T01."is_public" = FALSE`;
      break;
    case "ALL":
      isPublicCondition = "";
      break;
    default:
      throw new InternalServerError("Invalid TP");
  }

  return `
    SELECT
      T01."id"            AS "postId",
      T01."title",
      T01."view_count"    AS "viewCount",
      T01."created_at"    AS "createdAt",
      T01."updated_at"    AS "updatedAt",
      T01."content"       AS "content",
      T01."is_public"     AS "isPublic",
      T02."id"            AS "authorId",
      T02."email",
      T02."nickname",
      T02."avatar",
      T05."id"            AS "categoryId",
      T05."name"          AS "categoryName"
    FROM "${tables.POSTS_TABLE}" T01
    LEFT JOIN "${tables.USERS_TABLE}" T02 ON T01."author_id" = T02."id"
    LEFT JOIN "${tables.CATEGORIES_TABLE}" T05 ON T01."category_id" = T05."id"
    WHERE T01."id" = $1
      AND T01."deleted_at" IS NULL
      ${isPublicCondition}
  `;
};

/**
 * $1: search string
 * $2: isPublic
 * $3: offset
 * $4: size
 */
export const postListSql = (dto: TGetPostsDto) => {
  const orderBy =
    dto.order === "popular"
      ? `ORDER BY T01."created_at" DESC, T01."view_count" DESC`
      : `ORDER BY T01."created_at" DESC`;

  return `
      SELECT
        T01."id"            AS "postId",
        T01."title",
        T01."view_count"    AS "viewCount",
        T01."created_at"    AS "createdAt",
        T01."updated_at"    AS "updatedAt",
        T01."content"       AS "content",
        T01."is_public"     AS "isPublic",
        T02."id"            AS "authorId",
        T02."email",
        T02."nickname",
        T02."avatar",
        T05."id"            AS "categoryId",
        T05."name"          AS "categoryName"
      FROM "${tables.POSTS_TABLE}" T01
      LEFT JOIN "${tables.USERS_TABLE}" T02 ON T01."author_id" = T02."id"
      LEFT JOIN "${tables.CATEGORIES_TABLE}" T05 ON T01."category_id" = T05."id"
      WHERE LOWER(T01."title") LIKE LOWER('%' || $1 || '%')
        AND T01."deleted_at" IS NULL
        AND T01."is_public" = $2
      ${orderBy}
      OFFSET $3 ROWS FETCH NEXT $4 ROWS ONLY;
    `;
};

/**
 * $1: search string
 * $2: authorId
 * $3: offset
 * $4: size
 *
 * * 공개여부를 전부 가져온다.
 */
export const authorPostListSql = (dto: TGetPostsDto) => {
  const orderBy =
    dto.order === "popular"
      ? `ORDER BY T01."created_at" DESC, T01."view_count" DESC`
      : `ORDER BY T01."created_at" DESC`;

  return `
      SELECT
        T01."id"            AS "postId",
        T01."title",
        T01."view_count"    AS "viewCount",
        T01."created_at"    AS "createdAt",
        T01."updated_at"    AS "updatedAt",
        T01."content"       AS "content",
        T01."is_public"     AS "isPublic",
        T02."id"            AS "authorId",
        T02."email",
        T02."nickname",
        T02."avatar",
        T05."id"            AS "categoryId",
        T05."name"          AS "categoryName"
      FROM "${tables.POSTS_TABLE}" T01
      LEFT JOIN "${tables.USERS_TABLE}" T02 ON T01."author_id" = T02."id"
      LEFT JOIN "${tables.CATEGORIES_TABLE}" T05 ON T01."category_id" = T05."id"
      WHERE LOWER(T01."title") LIKE LOWER('%' || $1 || '%')
        AND T01."deleted_at" IS NULL
        AND T01."author_id" = $2
      ${orderBy}
      OFFSET $3 ROWS FETCH NEXT $4 ROWS ONLY;
    `;
};

/**
 * $1: postId
 * $2: authorId
 */
export const authorPostDetailSql = `
  SELECT
    T01."id"            AS "postId",
    T01."title",
    T01."view_count"    AS "viewCount",
    T01."created_at"    AS "createdAt",
    T01."updated_at"    AS "updatedAt",
    T01."content"       AS "content",
    T01."is_public"     AS "isPublic",
    T02."id"            AS "authorId",
    T02."email",
    T02."nickname",
    T02."avatar",
    T05."id"            AS "categoryId",
    T05."name"          AS "categoryName"
  FROM "${tables.POSTS_TABLE}" T01
  LEFT JOIN "${tables.USERS_TABLE}" T02 ON T01."author_id" = T02."id"
  LEFT JOIN "${tables.CATEGORIES_TABLE}" T05 ON T01."category_id" = T05."id"
  WHERE T01."id" = $1
    AND T01."author_id" = $2
    AND T01."deleted_at" IS NULL
`;

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

/**
 * $1: authorId
 * $2: title
 * $3: content
 * $4: isPublic
 * $5: categoryId
 */
export const postCreateSql = `
  INSERT INTO "${tables.POSTS_TABLE}" ("author_id", "title", "content", "is_public", "category_id")
  VALUES ($1, $2, $3, $4, $5)
  RETURNING id
`;

export const postUpdateSql = `
  UPDATE "${tables.POSTS_TABLE}"
  SET "title" = $2, "content" = $3, "is_public" = $4, "category_id" = $5
  WHERE "id" = $1
  RETURNING id
`;

/**
 * $1: postId
 *
 * * 삭제시 public 여부는 FALSE로 변경한다.
 */
export const postDeleteSql = `
  -- SOFT DELETE
  UPDATE "${tables.POSTS_TABLE}"
  SET "deleted_at" = CURRENT_TIMESTAMP, "is_public" = FALSE
  WHERE "id" = $1
  RETURNING id
`;

/**
 * $1: postId
 */
export const postIncreaseViewCountSql = `
  UPDATE "${tables.POSTS_TABLE}"
  SET "view_count" = "view_count" + 1
  WHERE "id" = $1
  RETURNING id
`;
