import { WEB_URL } from "@/constant";

export const generateUrl = (
  org: string,
  chipId: string,
  page?: string,
  ssr?: boolean
): string => {
  if (typeof window === "undefined") {
    return WEB_URL!;
  }
  const origin = window.location.origin;

  let url = `${origin}/${org}/${chipId}`;
  if (page) {
    let pagePath = page;
    if (pagePath.startsWith("/")) pagePath = pagePath.slice(1);
    url += `/${pagePath}`;
  }

  // s is shorted for ssr
  url += `?s=${!!ssr ? "1" : "0"}`;

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

export const shortenString = (text: string) => {
  const prefix = text.slice(0, 4 + 2); // Include '0x'
  const suffix = text.slice(-4);
  return prefix + "..." + suffix;
};
