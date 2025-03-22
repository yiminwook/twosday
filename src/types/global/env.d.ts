declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: "development" | "production" | "test";
      readonly TZ?: string;

      readonly NEXT_PUBLIC_MSW_ENABLED: "true" | "false" | undefined;

      // vercel env  - https://vercel.com/docs/projects/environment-variables/system-environment-variables
      readonly NEXT_PUBLIC_VERCEL_ENV: "production" | "preview" | "development";
      /** *.vercel.app */
      readonly NEXT_PUBLIC_VERCEL_URL: string;
      /** main | stg | dev | ...etc */
      readonly NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG: string;

      // public
      /** @Example - http://localhost:3000 */
      readonly NEXT_PUBLIC_API_URL: string;

      readonly NEXT_PUBLIC_AWS_CLOUD_FRONT_URL: string;

      // dev-tools
      readonly NEXT_PUBLIC_ENABLE_REACT_QUERY_DEVTOOLS?: "true" | "false";

      // pg
      readonly PG_HOST: string;
      readonly PG_DATABASE: string;
      readonly PG_USER: string;
      readonly PG_PASSWORD: string;

      readonly CLOUDFARE_ACCOUNT_ID: string;

      // cluodflare - r2
      readonly CLOUDFARE_R2_TOKEN: string;
      readonly CLOUDFARE_R2_ACCESS_ID: string;
      readonly CLOUDFARE_R2_SECRET_KEY: string;
      readonly CLOUDFARE_R2_BUCKET_NAME: string;

      // auth
      readonly AUTH_ACCESS_SECRET: string;
      readonly AUTH_REFRESH_SECRET: string;
      readonly AUTH_SALT: string;

      readonly GOOGLE_API_KEY: string;

      // LOG
      readonly DISCORD_WEBHOOK_URL: string;

      // MAIL
      readonly MAIL_USER: string;
      readonly MAIL_PASSWORD: string;
    }
  }
}

export {};
