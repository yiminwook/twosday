import { Client } from "pg";
import { z } from "zod";

// 공식문서
// https://node-postgres.com/apis/client
export type PGService<TArgs extends any[], TResult> = (
  client: Client,
  ...args: TArgs
) => Promise<TResult>;

/**
 * PG 연결을 자동으로 관리하는 고차 함수.
 */
export function withPgConnection<TArgs extends any[], TResult>(
  fn: PGService<TArgs, TResult>,
): (...args: TArgs) => Promise<TResult> {
  return async (...args: TArgs): Promise<TResult> => {
    const pgClient = new Client({
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
    });

    try {
      await pgClient.connect();

      // `await`를 추가하여 비동기 함수의 에러를 catch 블록에서 잡을 수 있도록 함
      return await fn(pgClient, ...args);
    } catch (error) {
      console.error("PG Connection Wrapper Error:", error);
      throw error;
    } finally {
      try {
        await pgClient.end();
      } catch (closeErr) {
        console.error("Error closing PG connection:", closeErr);
      }
    }
  };
}

export const zInt = z.number().int().positive();
