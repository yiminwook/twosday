import Image from "next/image";
import List from "./_component/List";

export default async function Page() {
  return (
    <div>
      <h1>조회 페이지</h1>
      <Image
        src={`${process.env.NEXT_PUBLIC_AWS_CLOUD_FRONT_URL}/twosday/6/5bd5dce3-2549-43c3-9432-30fc801bfee7.jpg`}
        alt="test"
        width={400}
        height={300}
      />
      <div>
        <List />
      </div>
    </div>
  );
}
