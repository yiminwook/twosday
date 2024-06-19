import { pgClient } from "@/model/pg";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await pgClient.connect();
  const result = await pgClient.query("SELECT * FROM posts_model");
  await pgClient.end();
  return NextResponse.json({ data: result.rows }, { status: 200 });
}
