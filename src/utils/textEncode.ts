export const utf8ToBase64 = (str: string) => {
  const utf8Bytes = new TextEncoder().encode(str);

  const binaryString = utf8Bytes.reduce((acc, cur) => {
    return acc + String.fromCharCode(cur);
  }, "");

  return btoa(binaryString);
};

export const base64ToUtf8 = (base64: string) => {
  const binaryString = atob(base64);
  const charCodes = new Uint8Array(binaryString.length);

  binaryString.split("").forEach((_s, i) => {
    charCodes[i] = binaryString.charCodeAt(i);
  });

  const decodedString = new TextDecoder().decode(charCodes);
  return decodedString;
};
