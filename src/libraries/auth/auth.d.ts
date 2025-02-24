declare global {
  /** JWT payload */
  interface JWT {
    /** uid */
    id: number;
    email: string;
    /** 로그인한 ISO-시간 */
    loginAt: Date;
    /** ISO-String */
    iss: Date;
    iat?: number;
    exp?: number;
  }

  /** Signin Session */
  interface Session extends JWT {
    accessToken: string;
    // avartar: string | null;
    // nickname: string;
    // accountType: "email";
    // status: "1" | "2" | "3";
    // createdAt: Date;
    // updatedAt: Date;
  }

  /** AccessToken Payload */
  interface Payload extends JWT {}
}

export {};
