import { getPureText } from "@/libraries/dompurify";
import { BadRequestError, serverErrorHandler } from "@/libraries/error";
import { getPosts, postPost } from "@/libraries/pg/posts/posts.service";
import { getPostsDto } from "@/libraries/pg/posts/posts.dto";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "qs";

const CONTENT_PREVIEW_STRING_MAX_LENGTH = 200;

// GET /api/v1/posts?order=popular&size=10&page=1&query=검색어
export async function GET(req: NextRequest) {
  try {
    const queryString = req.nextUrl.searchParams.toString();
    const searchParams = parse(queryString);
    const dto = getPostsDto.safeParse(searchParams);

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

// image ids
// tag ids
// title
// content

export async function POST() {
  try {
    const data = await postPost(6, {
      title: "테스트 타이틀 rollbacks",
      content: "테스트 콘텐츠",
      isPublic: true,
      tagIds: [],
      imageIds: [36, 37],
      categoryIds: [],
    });

    return NextResponse.json({ message: "성공적으로 글이 작성되었습니다.", data }, { status: 201 });
  } catch (error) {
    console.error(error);
    const { message, status } = serverErrorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}
