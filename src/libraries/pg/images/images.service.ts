import { pageOffset, withPgConnection } from "..";
import { IMAGES_TABLE } from "../tables";
import { TCreateImageDto, TGetImagesDto } from "./images.dto";

export const getImageByKey = withPgConnection(async (client, key: string) => {
  const sql = `
    SELECT *
    FROM "${IMAGES_TABLE}" T01
    WHERE T01."deletedAt" IS NULL
      AND T01."key" = $1
    LIMIT 1
  `;

  const result = await client.query(sql, [key]);
  return result.rows[0];
});

export const getImages = withPgConnection(async (client, dto: TGetImagesDto) => {
  const countSql = `
    SELECT COUNT(DISTINCT T01."id") as "count"
    FROM "${IMAGES_TABLE}" T01
    WHERE T01."deletedAt" IS NULL 
      AND ($1::int IS NULL OR T01."userId" = $1::int)
  `;

  const countResult = await client.query<{ count: number }>(countSql, [dto.userId]);

  const sql = `
    SELECT *
    FROM "${IMAGES_TABLE}" T01
    WHERE T01."deletedAt" IS NULL 
      AND ($1::int IS NULL OR T01."userId" = $1::int)
    ORDER BY T01."createdAt" DESC
    OFFSET $2 ROWS FETCH NEXT $3 ROWS ONLY
  `;

  const result = await client.query(sql, [dto.userId, pageOffset(dto.page, dto.size), dto.size]);

  return {
    images: result.rows,
    total: countResult.rows[0].count,
  };
});

export const postImage = withPgConnection(async (client, dto: TCreateImageDto) => {
  const sql = `
    INSERT INTO "${IMAGES_TABLE}" ("key", "userId")
    VALUES ($1, $2)
  `;

  const result = await client.query(sql, [dto.key, dto.userId]);
  return result.rows[0];
});

export const deleteImage = withPgConnection(async (client, key: string) => {
  const sql = `
    UPDATE "${IMAGES_TABLE}"
    SET "deletedAt" = CURRENT_TIMESTAMP
    WHERE "key" = $1
  `;

  const result = await client.query(sql, [key]);
  return result.rows[0];
});
