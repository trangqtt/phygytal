import { userInfoKey } from "@/constant";
import mem from "mem";
import { firebase_config } from "@/constant";

export const refreshTokenFn = async () => {
  try {
    const session = JSON.parse((localStorage as any).getItem(userInfoKey));

    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", session?.refreshToken);

    let fetchData = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      }),
      body: params,
    };

    const response = await fetch(
      `https://securetoken.googleapis.com/v1/token?key=${firebase_config.apiKey}`,
      fetchData
    );
    const data = await response.json();
    const newSession = {
      ...session,
      accessToken: data?.access_token,
      refreshToken: data?.refresh_token,
    };
    localStorage.setItem(userInfoKey, JSON.stringify(newSession));

    return newSession;
  } catch {
    localStorage.removeItem(userInfoKey);
  }
};

const maxAge = 10000;
export const memoizedRefreshToken = mem(refreshTokenFn, { maxAge });
