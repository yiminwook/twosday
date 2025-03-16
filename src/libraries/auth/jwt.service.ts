import jwt from "jsonwebtoken";
import { BadRequestError, InternalServerError } from "../error";
import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from "./config";
import { base64ToUtf8 } from "@/utils/textEncode";

export const generateAccessToken = async (data: Payload) => {
  return jwt.sign(data, process.env.AUTH_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_MAX_AGE });
};

export const generateRefreshToken = async (data: JWT) => {
  return jwt.sign(data, process.env.AUTH_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_MAX_AGE });
};

export const parseJwtToken = async <T extends "access" | "refresh">(token: string, type: T) => {
  try {
    return jwt.verify(
      token,
      type === "access" ? process.env.AUTH_ACCESS_SECRET : process.env.AUTH_REFRESH_SECRET,
    ) as unknown as T extends "access" ? Payload : JWT;
  } catch (error) {
    throw new BadRequestError("Invalid Token");
  }
};

export const checkBasicAuth = (auth: string | null) => {
  if (auth === null) {
    throw new InternalServerError("Invalid authorization");
  }
  try {
    const credentials = auth.split("Basic ")[1];
    const [corpCd, externId] = base64ToUtf8(credentials).split(":");
    return { corpCd, externId };
  } catch (e) {
    throw new InternalServerError("Invalid authorization");
  }
};

export const checkBearerAuth = (auth: string | null) => {
  if (auth === null) {
    throw new InternalServerError("Invalid authorization");
  }

  try {
    const token = auth.split("Bearer ")[1];
    const payload = parseJwtToken(token, "access");
    return payload;
  } catch (e) {
    throw new InternalServerError("Invalid authorization");
  }
};
