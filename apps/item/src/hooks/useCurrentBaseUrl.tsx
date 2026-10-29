import { getCurrentBaseUrl } from "@/utils/url";
import { useProductStory } from "./useProductStory";

export const useCurrentBaseUrl = () => {
  const { org, chipId } = useProductStory()
  return getCurrentBaseUrl(org!, chipId)
}
