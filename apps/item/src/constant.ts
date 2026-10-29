import firebaseConfig from "../firebase_config.json";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
export const userInfoKey = "phygital-user-info";
export const likeKey = 'liked';
export const envMode = process.env.NEXT_PUBLIC_MODE;
export const ggMapApiKey = process.env.NEXT_PUBLIC_GG_MAP_API;
export const gaApiKey = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
export const showNFT = process.env.NEXT_PUBLIC_SHOW_NFT === '1';
export const firebase_config = firebaseConfig;
export const prodMode = process.env.NEXT_PUBLIC_MODE === "production";
