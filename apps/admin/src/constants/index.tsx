import fbConfig from '../../firebase_config.json';
export const userInfoKey = 'phygital-admin-info';
export const accessTokenKey = 'accessToken';
export const LANGUAGES = [
  { label: 'EN', code: 'en' },
  { label: 'VI', code: 'vi' },
];

export const apiBaseUrl = import.meta.env.VITE_ADMIN_BACKEND_URL;
export const showNFT = import.meta.env.VITE_SHOW_NFT === '1';
export const themeKey = 'phygital-admin-theme';
export const firebaseConfig = fbConfig;
export const zeroID = '000000000000000000000000';
