"use client";
import PlaceHolder from "@/app/_component/loading/Placeholder";
import { Session } from "next-auth";

export default function Client({ session }: { session: Session }) {
  return (
    <div>
      Client
      <div style={{ width: "250px" }}>
        <PlaceHolder height="28px" />
        <br />
        <PlaceHolder height="28px" />
        <br />
        <PlaceHolder height="28px" />
        <br />
        <PlaceHolder height="28px" />
      </div>
    </div>
  );
}
