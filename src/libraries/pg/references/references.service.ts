import "server-only";
import { isDatabaseError, pageOffset, withPgConnection, withPgTransaction } from "..";
import { REFERENCES_TABLE } from "../tables";
import { TCreateReferenceDto, TGetReferencesDto, TReference } from "./references.dto";
import { InternalServerError } from "@/libraries/error";

export const getReferences = withPgConnection(async (connection, dto: TGetReferencesDto) => {
  const countSql = `
    SELECT COUNT(DISTINCT T01."id") as "count"
    FROM "${REFERENCES_TABLE}" T01
    WHERE T01."deleted_at" IS NULL
  `;

  const countResult = await connection.query<{ count: number }>(countSql);

  const sql = `
    SELECT  T01."id"            AS "id", 
            T01."url"           AS "url", 
            T01."thumbnail"     AS "thumbnail", 
            T01."title"         AS "title", 
            T01."description"   AS "description", 
            T01."created_at"    AS "createdAt", 
            T01."updated_at"    AS "updatedAt"
    FROM "${REFERENCES_TABLE}" T01
    WHERE T01."deleted_at" is NULL
    ORDER BY T01."created_at" DESC
    OFFSET $1 ROWS FETCH NEXT $2 ROWS ONLY
  `;

  const result = await connection.query<TReference>(sql, [
    pageOffset(dto.page, dto.size),
    dto.size,
  ]);
  return {
    total: countResult.rows[0].count,
    list: result.rows,
  };
});

export const postReference = withPgTransaction(async (connection, dto: TCreateReferenceDto) => {
  try {
    const sql = `
    INSERT INTO "${REFERENCES_TABLE}" ("url", "thumbnail", "title", "description")
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `;

    const result = await connection.query<{ id: number }>(sql, [
      dto.url,
      dto.thumbnail,
      dto.title,
      dto.description,
    ]);

    return result.rows[0];
  } catch (error) {
    if (isDatabaseError(error) && error.code === "23505") {
      throw new InternalServerError("이미 등록된 레퍼런스입니다.");
    }

    throw error;
  }
});

export const deleteReferenceById = withPgTransaction(async (connection, id: number) => {
  const sql = `
    UPDATE "${REFERENCES_TABLE}"
    SET "deleted_at" = CURRENT_TIMESTAMP
    WHERE "id" = $1
    RETURNING id
  `;

  const result = await connection.query<{ id: number }>(sql, [id]);
  return result.rows[0];
});
