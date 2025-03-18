import { ForbiddenError, UnauthorizedError } from "../error";
import { generateAccessToken, parseJwtToken } from "./jwt.service";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../pg/users/users.service";

export const signUpService = async (email: string, password: string) => {
  const saltRounds = Number(process.env.AUTH_SALT);
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
};

export const signInService = async (email: string, password: string) => {
  const userData = await getUserByEmail(email);

  if (!userData.password) {
    throw new ForbiddenError("소셜 로그인 사용자입니다.");
  }

  const isMatch = await bcrypt.compare(password, userData.password);

  if (!isMatch) {
    throw new ForbiddenError("이메일 또는 비밀번호를 확인 해주세요");
  }

  return { id: userData.id, email: userData.email };
};

export const signOutService = async (corpCd: string, externId: string) => {};

export const sessionService = async (
  refreshToken: string,
): Promise<{ jwt: JWT; accessToken: string }> => {
  try {
    const jwt = parseJwtToken(refreshToken, "refresh");
    delete jwt.iat;
    delete jwt.exp;
    jwt.iss = new Date();

    const accessToken = generateAccessToken(jwt);
    return { jwt, accessToken };
  } catch (error) {
    console.error(error);
    throw new UnauthorizedError("Invalid Token");
  }
};
