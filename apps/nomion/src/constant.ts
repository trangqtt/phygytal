import firebaseConfig from "../firebase_config.json";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL;
export const userInfoKey = "phygital-user-info";
export const envMode = process.env.NEXT_PUBLIC_MODE;
export const ggMapApiKey = process.env.NEXT_PUBLIC_GG_MAP_API;
export const gaApiKey = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
export const firebase_config = firebaseConfig;
export const itemUrl = process.env.NEXT_PUBLIC_ITEM_URL;
