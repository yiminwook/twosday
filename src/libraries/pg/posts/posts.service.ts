import { NotFoundError } from "@/libraries/error";
import { pageOffset, withPgConnection, withPgTransaction } from "..";
import { POSTS_IMAGES_TABLE, POSTS_TABLE, USERS_TABLE } from "../tables";
import { TCreatePostDto, TGetPostsDto } from "./posts.dto";
import {
  addImagesQueryByTransaction,
  removeImagesQueryByTransaction,
} from "../images/images.service";
import { addTagsQueryByTransaction, removeTagsQueryByTransaction } from "../tags/tags.service";
import { TSelectPost } from "./posts.type";

export const getPosts = withPgConnection(async (client, dto: TGetPostsDto) => {
  const countSql = `
    SELECT COUNT(DISTINCT T01."id") as "count"
    FROM "${POSTS_TABLE}" T01
    WHERE T01."deletedAt" IS NULL
      AND  LOWER(T01."title") LIKE LOWER('%' || $1 || '%')
  `;

  const countResult = await client.query<{ count: number }>(countSql, [dto.query]);

  const orderBy =
    dto.order === "popular"
      ? `ORDER BY T01."createdAt" DESC, T01."viewCount" DESC`
      : `ORDER BY T01."createdAt" DESC`;

  const listSql = `
    SELECT  T01."id"        AS "id",
            T01."authorId"  AS "authorId",
            T01."title"     AS "title",
            T01."content"   AS "content",
            T01."isPublic"  AS "isPublic",
            T01."viewCount" AS "viewCount",
            T01."createdAt" AS "createdAt",
            T01."updatedAt" AS "updatedAt",
            T01."deletedAt" AS "deletedAt",
            T02."nickname"  AS "nickname"
    FROM "${POSTS_TABLE}" T01
    LEFT JOIN "${USERS_TABLE}" T02 
      ON T01."authorId" = T02."id"
    WHERE T01."deletedAt" IS NULL
      AND  LOWER(T01."title") LIKE LOWER('%' || $1 || '%')
    ${orderBy}
    OFFSET $2 ROWS FETCH NEXT $3 ROWS ONLY
  `;

  const listResult = await client.query<TSelectPost>(listSql, [
    dto.query,
    pageOffset(dto.page, dto.size),
    dto.size,
  ]);

  return {
    posts: listResult.rows,
    total: countResult.rows[0].count,
  };
});

export const getPostById = withPgConnection(async (client, postId: number) => {
  // isPubilc이든 아니든 일단 가져와서 처리
  const postSql = `
    SELECT  T01."id"        AS "id",
            T01."authorId"  AS "authorId",
            T01."title"     AS "title",
            T01."content"   AS "content",
            T01."isPublic"  AS "isPublic",
            T01."viewCount" AS "viewCount",
            T01."createdAt" AS "createdAt",
            T01."updatedAt" AS "updatedAt",
            T01."deletedAt" AS "deletedAt",
            T02."nickname"  AS "authorName",
            ARRAY_AGG(T03."imagesId") AS imagesIds
    FROM "${POSTS_TABLE}" T01
    LEFT JOIN "${USERS_TABLE}" T02 
      ON T01."authorId" = T02."id"
    LEFT JOIN "${POSTS_IMAGES_TABLE}" T03
      ON T01."id" = T03."postsId"   
    WHERE T01."id" = $1
    GROUP BY  T01."id",
              T01."authorId",
              T01."title",     
              T01."content",   
              T01."isPublic",  
              T01."viewCount", 
              T01."createdAt",
              T01."updatedAt", 
              T01."deletedAt", 
              T02."nickname"  
  `;

  const postResult = await client.query<TSelectPost & { imagesId: number[]; tagIds: number[] }>(
    postSql,
    [postId],
  );

  if (postResult.rows.length === 0) {
    throw new NotFoundError("해당 글을 찾을 수 없습니다.");
  }

  return postResult.rows[0];
});

export const postPost = withPgTransaction(async (client, authorId: number, dto: TCreatePostDto) => {
  // tag insert
  // category insert
  const postSql = `
    INSERT INTO "${POSTS_TABLE}" ("authorId", "title", "content", "isPublic", "categoryId")
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `;

  const postSqlResult = await client.query<{
    id: number;
  }>(postSql, [authorId, dto.title, dto.content, dto.isPublic, dto.categoryId]);

  const postId = postSqlResult.rows[0].id;

  await addImagesQueryByTransaction(client, postId, dto.imageIds);

  return postSqlResult.rows[0];
});

export const putPost = withPgTransaction(async (client, postId: number, dto: TCreatePostDto) => {
  const currnetPost = await getPostById(postId);

  // category insert
  const postSql = `
    UPDATE "${POSTS_TABLE}"
    SET "title" = $2, "content" = $3, "isPublic" = $4, "categoryId" = $5
    WHERE "id" = $1
  `;

  const addImageList = dto.imageIds.filter((imageId) => !currnetPost.imagesId.includes(imageId));
  const removeImageList = currnetPost.imagesId.filter((imageId) => !dto.imageIds.includes(imageId));
  const addTagsList = dto.tagIds.filter((tagId) => !currnetPost.tagIds.includes(tagId));
  const removeTagsList = currnetPost.tagIds.filter((tagId) => !dto.tagIds.includes(tagId));

  await Promise.all([
    client.query(postSql, [postId, dto.title, dto.content, dto.isPublic, dto.categoryId]),
    addImagesQueryByTransaction(client, postId, addImageList),
    removeImagesQueryByTransaction(client, postId, removeImageList),
    addTagsQueryByTransaction(client, postId, addTagsList),
    removeTagsQueryByTransaction(client, postId, removeTagsList),
  ]);

  return { id: postId };
});

export const deletePost = withPgTransaction(async (client, postId: number) => {
  const sql = `
    -- SOFT DELETE
    UPDATE "${POSTS_TABLE}"
    SET "deletedAt" = CURRENT_TIMESTAMP, "isPublic" = FALSE
    WHERE "id" = $1
  `;

  await client.query(sql, [postId]);
  return { id: postId };
});
