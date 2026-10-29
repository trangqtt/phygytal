import { WEB_URL } from "@/constant";

export const generateUrl = (org: string, chipId: string, page?: string): string => {
  if (typeof window === "undefined") {
    return WEB_URL!;
  }
  const origin = window.location.origin;

  let url = `${origin}/${org}/${chipId}`;
  if (page) {
    url += `/${page}`;
  }
  return url;
};

export const generateHomeUrl = (org: string, chipId: string) => {
  return generateUrl(org, chipId);
};

export const getCurrentBaseUrl = (org: string, chipId: string) => {
  if (typeof window === "undefined") {
    return WEB_URL;
  }
  const origin = window.location.origin;
  return `${origin}/${org}/${chipId}`;
};
