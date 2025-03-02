import { withPgConnection, withPgTransaction } from "..";
import { CATEGORIES_TABLE } from "../tables";
import { TPostCategoryDto, TPutCategoryDto } from "./categories.dto";

export const getCategories = withPgConnection(async (client) => {
  const sql = `
    -- 페이지네이션 없이 모든 카테고리를 조회
    SELECT  T01."id"        AS id,  
            T01."parentId"  AS parentId, 
            T01."name"      AS name
    FROM "${CATEGORIES_TABLE}" T01
  `;

  const result = await client.query<{ id: number; parent_id: number | null; name: string }>(sql);
  return result.rows;
});

export const postCategory = withPgTransaction(async (client, dto: TPostCategoryDto) => {
  const sql = `
    INSERT INTO "${CATEGORIES_TABLE}" (parentId, name)
    VALUES ($1, $2)
    RETURNING id
  `;

  const result = await client.query<{ id: number }>(sql, [dto.parentId, dto.name]);
  return result.rows[0];
});

export const putCategory = withPgTransaction(async (client, dto: TPutCategoryDto) => {
  const sql = `
    UPDATE "${CATEGORIES_TABLE}"
    SET parentId = $2, name = $3
    WHERE id = $1
  `;

  await client.query(sql, [dto.id, dto.parentId, dto.name]);
  return { id: dto.id };
});

export const deleteCategory = withPgTransaction(async (client, id: number) => {
  const sql = `
    -- HARD DELETE, 삭제시 자식 CATEGORIRES.parentId와 POSTS.categoryId가 NULL로 변경됨
    DELETE FROM "${CATEGORIES_TABLE}"
    WHERE id = $1
  `;

  await client.query(sql, [id]);
  return { id };
});
