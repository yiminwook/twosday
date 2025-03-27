import { withPgConnection } from "..";
import { USERS_TABLE } from "../tables";

export const getUserByEmail = withPgConnection(async (client, email: string) => {
  const query = `
    SELECT  T01."id"       AS "id",
            T01."email"    AS "email", 
            T01."password" AS "password"
    FROM "${USERS_TABLE}" T01
    WHERE T01."email" = $1 AND T01."deleted_at" IS NULL
  `;

  const result = await client.query<{
    id: number;
    email: string;
    password: string | null;
  }>(query, [email]);

  return result.rows[0];
});
