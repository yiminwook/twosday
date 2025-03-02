import * as nodemailer from "nodemailer";
import { verificationTemplate } from "./template/verificationCode.";

export const sendVerificationCode = async (email: string, code: string) => {
  const user = process.env.MAIL_USER;
  const transporter = nodemailer.createTransport({
    service: "naver",
    auth: { user, pass: process.env.MAIL_PASSWORD },
  });

  const mailOptions = await transporter.sendMail({
    from: user,
    to: email,
    subject: "Verification Code",
    html: verificationTemplate(code),
  });

  return mailOptions;
};
