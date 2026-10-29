import { OS } from "@/models/general";

export const containWhiteSpace = (string: string) => {
  return / /.test(string);
};

export const detectMobileOperatingSystem = () => {
  const userAgent = navigator.userAgent;

  if (/android/i.test(userAgent)) {
    return OS.Android;
  } else if (/iPad|iPhone|iPod/i.test(userAgent)) {
    return OS.iOS;
  } else {
    return "Unknown";
  }
}
