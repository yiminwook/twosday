export const readFile = async (file: File) => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
};
