import { utf8ToBase64 } from "@/utils/text-encode";
import { clientApi } from "./fetcher";

export const signInFn = async (arg: { email: string; password: string }) => {
  const res = await clientApi
    .post<{ message: string }>("auth/signin", {
      method: "POST",
      headers: {
        Authorization: "Basic " + utf8ToBase64(`${arg.email}:${arg.password}`),
      },
    })
    .json();

  return res;
};
