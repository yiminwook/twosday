import { getPureText } from "@/libraries/dompurify";
import { BadRequestError, serverErrorHandler } from "@/libraries/error";
import { getPosts } from "@/libraries/pg/post/post.service";
import { getPostsParamsDto } from "@/libraries/pg/post/posts.dto";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "qs";

const CONTENT_PREVIEW_STRING_MAX_LENGTH = 200;

// GET /api/v1/posts?order=popular&size=10&page=1&query=검색어
export async function GET(req: NextRequest) {
  try {
    const queryString = req.nextUrl.searchParams.toString();
    const searchParams = parse(queryString);
    const dto = getPostsParamsDto.safeParse(searchParams);

    if (dto.error) {
      console.error(dto.error);
      throw new BadRequestError(dto.error.errors[0].message);
    }

    const data = await getPosts(dto.data);
    const parsedPosts = data.posts.map((post) => ({
      ...post,
      content: getPureText(post.content).slice(0, CONTENT_PREVIEW_STRING_MAX_LENGTH),
    }));

    return NextResponse.json(
      { message: "글목록이 검색 되었습니다.", data: { ...data, posts: parsedPosts } },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}
