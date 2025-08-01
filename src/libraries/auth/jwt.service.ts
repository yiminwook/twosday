import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../error";
import { ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE } from "./config";
import { base64ToUtf8 } from "@/utils/text-encode";

export const generateAccessToken = (data: Payload) => {
  return jwt.sign(data, process.env.AUTH_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_MAX_AGE });
};

export const generateRefreshToken = (data: JWT) => {
  return jwt.sign(data, process.env.AUTH_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_MAX_AGE });
};

export const parseJwtToken = <T extends "access" | "refresh">(token: string, type: T) => {
  return jwt.verify(
    token,
    type === "access" ? process.env.AUTH_ACCESS_SECRET : process.env.AUTH_REFRESH_SECRET,
  ) as unknown as T extends "access" ? Payload : JWT;
};

export const checkBasicAuth = (auth: string | null) => {
  if (auth === null) {
    throw new UnauthorizedError("Invalid authorization");
  }
  try {
    const credentials = auth.split("Basic ")[1];
    const [email, password] = base64ToUtf8(credentials).split(":");
    return { email, password };
  } catch (error) {
    console.error(error);
    throw new UnauthorizedError("Invalid authorization");
  }
};

export const checkBearerAuth = (auth: string | null) => {
  if (auth === null) {
    throw new UnauthorizedError("Invalid authorization");
  }

  try {
    const token = auth.split("Bearer ")[1];
    const payload = parseJwtToken(token, "access");
    return payload;
  } catch (error) {
    console.error(error);
    throw new UnauthorizedError("Invalid authorization");
  }
};
