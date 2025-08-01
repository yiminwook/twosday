import { REFERENCES_TABLE } from "../tables";

export const referenceCountSql = `
  SELECT COUNT(DISTINCT T01."id") as "count"
  FROM "${REFERENCES_TABLE}" T01
  WHERE T01."deleted_at" IS NULL
`;

export const referenceListSql = `
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

export const referenceCreateSql = `
 INSERT INTO "${REFERENCES_TABLE}" ("url", "thumbnail", "title", "description")
  VALUES ($1, $2, $3, $4)
  RETURNING id
`;

export const referenceDeleteSql = `
  UPDATE "${REFERENCES_TABLE}"
  SET "deleted_at" = CURRENT_TIMESTAMP
  WHERE "id" = $1
  RETURNING id
`;
