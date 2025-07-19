export const serverActionHandler = async <T>(
  action: Promise<{
    message: string;
    data?: T | undefined;
  }>,
) => {
  const res = await action;
  if (!res.data) throw new Error(res.message);
  return res.data;
};
