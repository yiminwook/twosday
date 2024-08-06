interface PageProps {
  searchParams: {
    cause?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const decodedCause = decodeURIComponent(
    searchParams.cause || "리소스에 대한 접근권한이 없습니다.",
  );

  return <div>{decodedCause}</div>;
}
