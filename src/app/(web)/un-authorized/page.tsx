interface PageProps {
  searchParams: Promise<{
    cause?: string;
  }>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const decodedCause = decodeURIComponent(
    searchParams.cause || "리소스에 대한 접근권한이 없습니다.",
  );

  return <div>{decodedCause}</div>;
}
