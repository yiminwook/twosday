import "server-only";
import { Client, DatabaseError, Pool, PoolClient } from "pg";
import { z } from "zod";
import { CustomServerError } from "../error";

const PG_PORT = 5432 as const;

// 공식문서
// https://node-postgres.com/apis/client
export type TPGService<TArgs extends any[], TResult> = (
  client: Client,
  ...args: TArgs
) => Promise<TResult>;

/**
 * PG 연결을 관리하는 고차 함수.
 */
export function withPgConnection<TArgs extends any[], TResult>(
  fn: TPGService<TArgs, TResult>,
): (...args: TArgs) => Promise<TResult> {
  return async (...args: TArgs): Promise<TResult> => {
    const pgClient = new Client({
      host: process.env.PG_HOST,
      port: PG_PORT,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
    });

    try {
      await pgClient.connect();

      // `await`를 추가하여 비동기 함수의 에러를 catch 블록에서 잡을 수 있도록 함
      const result = await fn(pgClient, ...args);
      return result;
    } catch (error) {
      if (isDatabaseError(error)) {
        console.error("PG Connection 에러코드   :", error.code);
        console.error("PG Connection 에러메세지 :", error.message);
        console.error("PG Connection 에러상세   :", error.detail);
        throw new CustomServerError("관리자에게 문의하세요", 599, "DatabaseError");
      }
      throw error;
    } finally {
      await pgClient.end();
    }
  };
}

const pool = new Pool({
  host: process.env.PG_HOST,
  port: PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

export type TPgTransaction<TArgs extends any[], TResult> = (
  client: PoolClient,
  ...args: TArgs
) => Promise<TResult>;

/**
 * PG 트랜젝션을 관리하는 고차 함수.
 */
export function withPgTransaction<TArgs extends any[], TResult>(
  fn: TPgTransaction<TArgs, TResult>,
): (...args: TArgs) => Promise<TResult> {
  return async (...args: TArgs): Promise<TResult> => {
    const pgClient = await pool.connect();

    try {
      await pgClient.query("BEGIN");

      // `await`를 추가하여 비동기 함수의 에러를 catch 블록에서 잡을 수 있도록 함
      const result = await fn(pgClient, ...args);

      await pgClient.query("COMMIT");

      return result;
    } catch (error) {
      await pgClient.query("ROLLBACK");
      if (isDatabaseError(error)) {
        console.error("PG Connection 에러코드   :", error.code);
        console.error("PG Connection 에러메세지 :", error.message);
        console.error("PG Connection 에러상세   :", error.detail);
        throw new CustomServerError("관리자에게 문의하세요", 599, "DatabaseError");
      }
      throw error;
    } finally {
      pgClient.release();
    }
  };
}

export const zInt = z.number().int().positive();

/**
 * page가 0또는 1일때 0으로 처리
 *
 * OFFSET ROWS FETCH NEXT ROWS ONLY 구문에 사용
 */
export const pageOffset = (currentPage: number, pageSize: number) => {
  // 페이지는 1보다 작을 수 없음,
  return currentPage < 2 ? 0 : (currentPage - 1) * pageSize;
};

export const isDatabaseError = (error: unknown): error is DatabaseError => {
  return error instanceof DatabaseError;
};
