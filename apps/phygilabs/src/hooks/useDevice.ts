import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function iOS() {
  if (typeof window === 'undefined') {
    return false;
  }
  return (
    ["iPad Simulator", "iPhone Simulator", "iPad", "iPhone"].includes(
      navigator?.platform
    ) ||
    // iPad on iOS 13 detection
    (navigator?.userAgent?.includes("Mac") && "ontouchend" in document)
  );
}

export default function useDevice() {
  const theme = useTheme();
  return {
    isMobile: useMediaQuery(theme.breakpoints.down("sm")),
    isTablet: useMediaQuery(theme.breakpoints.down("md")),
    isSmallDesktop: useMediaQuery(theme.breakpoints.down("lg")),
    isLargerDesktop: useMediaQuery(theme.breakpoints.up("xl")),
    isIOS: iOS(),
  };
}
