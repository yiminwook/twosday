import "server-only";
export const USERS_TABLE = "users";

// CREATE INDEX posts_public_deleted_created_idx
// ON "posts" (is_public, deleted_at, created_at DESC);
export const POSTS_TABLE = "posts";

export const IMAGES_TABLE = "images";

export const TAGS_TABLE = "tags";

// CREATE INDEX references_deleted_created_at_desc_idx
// ON "references" (deleted_at, created_at DESC);
export const REFERENCES_TABLE = "references";

export const CATEGORIES_TABLE = "categories";

// m:n tables
export const POSTS_IMAGES_TABLE = "posts_images";
export const POSTS_TAGS_TABLE = "posts_tags";
