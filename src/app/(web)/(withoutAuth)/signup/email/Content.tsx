"use client";

import SignupForm from "@/app/(web)/(withoutAuth)/signup/_component/SignupForm";
import { SIGNUP_EMAIL_PAGE_VALUES, useSignupEmailStore } from "../_lib/store";
import EmailConfirm from "../_component/EmailConfirm";

export default function Content() {
  const page = useSignupEmailStore((store) => store.page);

  let content: JSX.Element;
  switch (page) {
    case SIGNUP_EMAIL_PAGE_VALUES.EMAIL:
      content = <SignupForm />;
      break;
    case SIGNUP_EMAIL_PAGE_VALUES.EMAIL_CONFIRM:
      content = <EmailConfirm />;
      break;
    case SIGNUP_EMAIL_PAGE_VALUES.PASSWORD:
      content = <SignupForm />;
      break;
    default:
      content = <SignupForm />;
  }
  return <SignupForm />;
}
