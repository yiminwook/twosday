import { CredentialAuthorize, Credentials } from "@/type/nextAuth";

export const credentialAuthorize: CredentialAuthorize = async (_credentials, req) => {
  try {
    const credentials = _credentials as unknown as Credentials;
    if (!credentials) return null;

    return {
      id: "",
      sessionId: "",
      sessionKey: "",
      errorMsg: undefined,
    };
  } catch (error) {
    console.error("EmailLogin", error);

    return {
      id: "error",
      sessionId: "",
      sessionKey: "",
      errorMsg: error instanceof Error ? error.message : "서비스 접근권한이 없습니다.",
    };
  }
};
