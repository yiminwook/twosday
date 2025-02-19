declare global {
  /** JWT payload */
  interface JWT {
    /** uid */
    id: number;
    email: string;
    /** 로그인한 ISO-시간 */
    loginAt: string;
    /** ISO-String */
    iss: string;
    iat?: number;
    exp?: number;
  }

  /** Signin Session */
  interface Session extends JWT {
    accessToken: string;
  }

  /** AccessToken Payload */
  interface Payload extends JWT {}
}

export {};
