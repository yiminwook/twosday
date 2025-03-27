import { withPgConnection, withPgTransaction } from "..";
import { CATEGORIES_TABLE, POSTS_TABLE } from "../tables";
import { TPostCategoryDto, TPutCategoryDto } from "./categories.dto";

export const getCategories = withPgConnection(async (client) => {
  const sql = `
    -- 페이지네이션 없이 모든 카테고리를 조회
    SELECT  T01."id"           AS categoryId,  
            T01."parent_id"    AS parentId, 
            T01."name"         AS name,
            COUNT(T03."id")    AS postCount
    FROM "${CATEGORIES_TABLE}" T01
    LEFT JOIN "${CATEGORIES_TABLE}" T02 
      -- 자기 자신을 부모로 가질 수 없음. CONSTRAINT:chk_no_self_reference
      ON T01."id" = T02."parent_id"
    LEFT JOIN "${POSTS_TABLE}" T03 
      ON T02."id" = T03."category_id"
    GROUP BY 
      T01."id", 
      T01."parent_id", 
      T01."name"
    ORDER BY 
      T01."id";
  `;

  const result = await client.query<{
    category_id: number;
    parent_id: number | null;
    category_name: string;
    post_count: number;
  }>(sql);
  return result.rows;
});

export const postCategory = withPgTransaction(async (client, dto: TPostCategoryDto) => {
  const sql = `
    INSERT INTO "${CATEGORIES_TABLE}" (parent_id, name)
    VALUES ($1, $2)
    RETURNING id
  `;

  const result = await client.query<{ id: number }>(sql, [dto.parentId, dto.name]);
  return result.rows[0];
});

export const putCategory = withPgTransaction(async (client, dto: TPutCategoryDto) => {
  const sql = `
    UPDATE "${CATEGORIES_TABLE}"
    SET parent_id = $2, name = $3
    WHERE id = $1
  `;

  await client.query(sql, [dto.id, dto.parentId, dto.name]);
  return { id: dto.id };
});

export const deleteCategory = withPgTransaction(async (client, id: number) => {
  const sql = `
    -- HARD DELETE, 삭제시 자식 categories.parent_id와 posts.category_id가 NULL로 변경됨
    DELETE FROM "${CATEGORIES_TABLE}"
    WHERE id = $1
  `;

  await client.query(sql, [id]);
  return { id };
});
