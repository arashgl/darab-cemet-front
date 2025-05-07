export const parseImageURL = (url: string | null | undefined) => {
  if (!url) return "";
  if (process.env.NEXT_PUBLIC_API_URL?.endsWith("/"))
    return process.env.NEXT_PUBLIC_API_URL + url;
  return process.env.NEXT_PUBLIC_API_URL + "/" + url;
};
