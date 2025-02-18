import { withPgConnection } from "..";
import { POSTS_TABLE, USERS_TABLE } from "../tables";
import { TGetPostsParamsDto } from "./posts.dto";

export const getPosts = withPgConnection(async (client, dto: TGetPostsParamsDto) => {
  const countQuery = `
  SELECT COUNT(DISTINCT T01."id") as "count"
  FROM "${POSTS_TABLE}" T01
  WHERE T01."deletedAt" IS NULL
    AND  LOWER(T01."title") LIKE LOWER('%' || $1 || '%')
`;

  const countResult = await client.query(countQuery, [dto.query]);

  const orderBy =
    dto.order === "popular"
      ? `ORDER BY T01."createdAt" DESC, T01."viewCount" DESC`
      : `ORDER BY T01."createdAt" DESC`;

  const listQuery = `
    SELECT  T01."id" as "id",
            T01."authorId" as "authorId",
            T01."title" as "title",
            T01."content" as "content",
            T01."isPublic" as "isPublic",
            T01."viewCount" as "viewCount",
            T01."createdAt" as "createdAt",
            T01."updatedAt" as "updatedAt",
            T01."deletedAt" as "deletedAt",
            T02."nickname" as "authorName"
    FROM "${POSTS_TABLE}" T01
    LEFT JOIN "${USERS_TABLE}" T02 
      ON T01."authorId" = T02."id"
    WHERE T01."deletedAt" IS NULL
      AND  LOWER(T01."title") LIKE LOWER('%' || $1 || '%')
    ${orderBy}
    OFFSET $2 ROWS FETCH NEXT $3 ROWS ONLY
  `;

  const listResult = await client.query(listQuery, [
    dto.query,
    dto.page < 2 ? 0 : (dto.page - 1) * dto.size, // 페이지는 1보다 작을 수 없음
    dto.size,
  ]);

  return {
    posts: listResult.rows,
    total: countResult.rows[0].count,
  };
});
