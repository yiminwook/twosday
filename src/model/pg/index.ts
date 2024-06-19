import { Client } from "pg";

// 공식문서
// https://node-postgres.com/apis/client
export const pgClient = new Client({
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});
