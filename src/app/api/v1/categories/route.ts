import { serverErrorHandler } from "@/libraries/error";
import { getCategories } from "@/libraries/pg/categories/categories.service";
import { buildCategoryTree } from "@/utils/tree";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const rows = await getCategories();
    const tree = buildCategoryTree(rows);

    return NextResponse.json({ data: tree, message: "카테고리 조회 성공" });
  } catch (error) {
    console.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}
