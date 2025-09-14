import "server-only";
import { PoolClient } from "pg";
import { pageOffset, withPgConnection, withPgTransaction } from "..";
import { IMAGES_TABLE, POSTS_IMAGES_TABLE } from "../tables";
import { TCreateImageDto, TGetImagesDto } from "./images.dto";

export const getImageByKey = withPgConnection(async (client, key: string) => {
  const sql = `
    SELECT *
    FROM "${IMAGES_TABLE}" T01
    WHERE T01."deleted_at" IS NULL
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
    WHERE T01."deleted_at" IS NULL 
      AND ($1::int IS NULL OR T01."userId" = $1::int)
  `;

  const countResult = await client.query<{ count: number }>(countSql, [dto.userId]);

  const sql = `
    SELECT *
    FROM "${IMAGES_TABLE}" T01
    WHERE T01."deleted_at" IS NULL 
      AND ($1::int IS NULL OR T01."user_id" = $1::int)
    ORDER BY T01."created_at" DESC
    OFFSET $2 ROWS FETCH NEXT $3 ROWS ONLY
  `;

  const result = await client.query(sql, [dto.userId, pageOffset(dto.page, dto.size), dto.size]);

  return {
    images: result.rows,
    total: countResult.rows[0].count,
  };
});

export const postImage = withPgTransaction(async (client, dto: TCreateImageDto) => {
  const sql = `
    INSERT INTO "${IMAGES_TABLE}" ("key", "user_id")
    VALUES ($1, $2)
    RETURNING id
  `;

  const result = await client.query<{ id: number }>(sql, [dto.key, dto.userId]);
  return result.rows[0];
});

export const deleteImage = withPgTransaction(async (client, key: string) => {
  const sql = `
    UPDATE "${IMAGES_TABLE}"
    SET "deleted_at" = CURRENT_TIMESTAMP
    WHERE "key" = $1
    RETURNING id
  `;

  const result = await client.query<{ id: number }>(sql, [key]);
  return result.rows[0];
});

export const addImagesQueryByTransaction = async (
  client: PoolClient,
  postId: number,
  imageKeys: string[],
) => {
  if (imageKeys.length === 0) return; // 이미지가 없으면 실행하지 않음

  const multiPostImageValues: (number | string)[] = [];
  const multiPostImagePlaceholders = imageKeys
    .map((imageKey, index) => {
      multiPostImageValues.push(postId, imageKey);
      return `($${index * 2 + 1},  (SELECT "id" FROM "${IMAGES_TABLE}" WHERE "key" = $${
        index * 2 + 2
      }))`;
    })
    .join(", ");

  const multiPostImageSql = `
    INSERT INTO "${POSTS_IMAGES_TABLE}" ("posts_id", "images_id")
    VALUES ${multiPostImagePlaceholders}
  `;

  return client.query(multiPostImageSql, multiPostImageValues);
};

export const removeImagesQueryByTransaction = async (
  client: PoolClient,
  postId: number,
  imageKeys: string[],
) => {
  if (imageKeys.length === 0) return; // 이미지가 없으면 실행하지 않음

  // ANY  : 배열 안에 포함된 값 중 하나라도 일치하면 참
  // "imagesId"= $2 OR "imagesId"= $3 OR "imagesId"= $4

  const multiPostImageSql = `
    DELETE FROM "${POSTS_IMAGES_TABLE}"
    WHERE "posts_id" = $1 AND "images_id" IN (
      SELECT "id" FROM "${IMAGES_TABLE}" WHERE "key" = ANY($2)
    )
  `;

  return client.query(multiPostImageSql, [postId, imageKeys]);
};
