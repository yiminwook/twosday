import "server-only";
import { InternalServerError } from "@/libraries/error";
import { isDatabaseError, withPgConnection, withPgTransaction } from "..";
import { POSTS_TAGS_TABLE, TAGS_TABLE } from "../tables";
import { TPostTagDto, TPutTagDto } from "./tags.dto";
import { PoolClient } from "pg";

type TSelectTag = {
  id: number;
  name: string;
  updatedAt: string;
  createdAt: string;
  deletedAt: string | null;
};

export const getTags = withPgConnection(async (client) => {
  const sql = `
    -- 페이지네이션 없이 전체조회
    SELECT  T01."id"        AS "id",
            T01."name"      AS "name"
    FROM "${TAGS_TABLE}" T01
    ORDER BY
      -- 첫번째 정렬기준 
      CASE 
        WHEN T01."name" ~ '^[0-9]'    THEN 0
        WHEN T01."name" ~ '^[A-Za-z]' THEN 1
        ELSE 2
      END,
      -- 두번째 정렬기준
      T01."name" ASC;
  `;

  const result = await client.query<TSelectTag>(sql);

  return result.rows;
});

export const getTagById = withPgConnection(async (client, id: number) => {
  const sql = `
    SELECT  T01."id"        AS "id",
            T01."name"      AS "name"
    FROM "${TAGS_TABLE}" T01
    WHERE T01."id" = $1;
  `;

  const result = await client.query<TSelectTag>(sql, [id]);

  return result.rows[0];
});

export const postTag = withPgTransaction(async (client, dto: TPostTagDto) => {
  try {
    const sql = `
    INSERT INTO "${TAGS_TABLE}" ("name") 
    VALUES ($1)
    RETURNING "id";
  `;

    const result = await client.query<{ id: number }>(sql, [dto.name]);

    return result.rows[0];
  } catch (error) {
    if (isDatabaseError(error) && error.code === "23505") {
      throw new InternalServerError("이미 존재하는 태그입니다.");
    }

    throw error;
  }
});

export const putTag = withPgTransaction(async (client, dto: TPutTagDto) => {
  try {
    const sql = `
    UPDATE "${TAGS_TABLE}"
    SET "name" = $2
    WHERE "id" = $1
  `;

    await client.query<{ id: number }>(sql, [dto.id, dto.name]);
    return { id: dto.id };
  } catch (error) {
    if (isDatabaseError(error) && error.code === "23505") {
      throw new InternalServerError("이미 존재하는 태그입니다.");
    }

    throw error;
  }
});

export const deleteTag = withPgTransaction(async (client, id: number) => {
  const sql = `
    -- HARD DELETE, 삭제시 POSTS_TAGS 테이블에서도 삭제됨
    DELETE FROM "${TAGS_TABLE}"
    WHERE "id" = $1
  `;

  await client.query(sql, [id]);
  return { id };
});

export const addTagsQueryByTransaction = async (
  client: PoolClient,
  postId: number,
  tagIds: number[],
) => {
  if (tagIds.length === 0) return; // 태그가 없으면 실행하지 않음

  const multiPostTagValues: number[] = [];
  const multiPostTagPlaceholders = tagIds
    .map((tagId, index) => {
      multiPostTagValues.push(postId, tagId);
      return `($${index * 2 + 1}, $${index * 2 + 2})`;
    })
    .join(", ");

  const multiPostTagSql = `
    INSERT INTO "${POSTS_TAGS_TABLE}" ("posts_id", "tags_id")
    VALUES ${multiPostTagPlaceholders}
  `;

  return client.query(multiPostTagSql, multiPostTagValues);
};

export const removeTagsQueryByTransaction = async (
  client: PoolClient,
  postId: number,
  tagIds: number[],
) => {
  if (tagIds.length === 0) return; // 태그가 없으면 실행하지 않음

  // ANY  : 배열 안에 포함된 값 중 하나라도 일치하면 참
  // "tagsId"= $2 OR "tagsId"= $3 OR "tagsId"= $4

  const multiPostTagSql = `
    DELETE FROM "${POSTS_TAGS_TABLE}"
    WHERE "posts_id" = $1 AND "tags_id" = ANY($2)
  `;

  return client.query(multiPostTagSql, [postId, tagIds]);
};
