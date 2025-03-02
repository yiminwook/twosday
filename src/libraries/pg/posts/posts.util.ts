import { POSTS_IMAGES_TABLE } from "../tables";

export const addImages = (postId: number, imageIds: number[]) => {
  const multiPostImageValues: number[] = [];
  const multiPostImagePlaceholders = imageIds
    .map((imageId, index) => {
      multiPostImageValues.push(postId, imageId);
      return `($${index * 2 + 1}, $${index * 2 + 2})`;
    })
    .join(", ");

  const multiPostImageSql = `
    INSERT INTO "${POSTS_IMAGES_TABLE}" ("postsId", "imagesId")
    VALUES ${multiPostImagePlaceholders}
  `;

  return {
    sql: multiPostImageSql,
    value: multiPostImageValues,
  };
};

export const removeImages = (postId: number, imageIds: number[]) => {
  // ANY  : 배열 안에 포함된 값 중 하나라도 일치하면 참
  // "imagesId"= $2 OR "imagesId"= $3 OR "imagesId"= $4

  const multiPostImageSql = `
    DELETE FROM "${POSTS_IMAGES_TABLE}"
    WHERE "postsId" = $1 AND "imagesId" = ANY($2)
  `;

  return {
    sql: multiPostImageSql,
    value: [postId, imageIds],
  };
};
