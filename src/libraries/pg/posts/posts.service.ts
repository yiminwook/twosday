import { pageOffset, withPgConnection } from "..";
import { POSTS_TABLE, USERS_TABLE } from "../tables";
import { TGetPostsDto } from "./posts.dto";

export const getPosts = withPgConnection(async (client, dto: TGetPostsDto) => {
  const countSql = `
    SELECT COUNT(DISTINCT T01."id") as "count"
    FROM "${POSTS_TABLE}" T01
    WHERE T01."deletedAt" IS NULL
      AND  LOWER(T01."title") LIKE LOWER('%' || $1 || '%')
  `;

  const countResult = await client.query<{ count: number }>(countSql, [dto.query]);

  const orderBy =
    dto.order === "popular"
      ? `ORDER BY T01."createdAt" DESC, T01."viewCount" DESC`
      : `ORDER BY T01."createdAt" DESC`;

  const listSql = `
    SELECT  T01."id"        AS "id",
            T01."authorId"  AS "authorId",
            T01."title"     AS "title",
            T01."content"   AS "content",
            T01."isPublic"  AS "isPublic",
            T01."viewCount" AS "viewCount",
            T01."createdAt" AS "createdAt",
            T01."updatedAt" AS "updatedAt",
            T01."deletedAt" AS "deletedAt",
            T02."nickname"  AS "authorName"
    FROM "${POSTS_TABLE}" T01
    LEFT JOIN "${USERS_TABLE}" T02 
      ON T01."authorId" = T02."id"
    WHERE T01."deletedAt" IS NULL
      AND  LOWER(T01."title") LIKE LOWER('%' || $1 || '%')
    ${orderBy}
    OFFSET $2 ROWS FETCH NEXT $3 ROWS ONLY
  `;

  const listResult = await client.query(listSql, [
    dto.query,
    pageOffset(dto.page, dto.size),
    dto.size,
  ]);

  return {
    posts: listResult.rows,
    total: countResult.rows[0].count,
  };
});
