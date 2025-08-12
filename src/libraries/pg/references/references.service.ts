import "server-only";
import { isDatabaseError, pageOffset, withPgConnection, withPgTransaction } from "..";
import { TCreateReferenceDto, TGetReferencesDto, TReference } from "./references.dto";
import { InternalServerError } from "@/libraries/error";
import * as sql from "./references.sql";

export const getReferences = withPgConnection(async (connection, dto: TGetReferencesDto) => {
  const [countResult, listResult] = await Promise.all([
    connection.query<{ count: number }>(sql.referenceCountSql),
    connection.query<TReference>(sql.referenceListSql, [pageOffset(dto.page, dto.size), dto.size]),
  ]);

  return {
    list: listResult.rows,
    total: countResult.rows[0].count,
  };
});

export const postReference = withPgTransaction(async (connection, dto: TCreateReferenceDto) => {
  try {
    const result = await connection.query<{ id: number }>(sql.referenceCreateSql, [
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
  const result = await connection.query<{ id: number }>(sql.referenceDeleteSql, [id]);
  return result.rows[0];
});
