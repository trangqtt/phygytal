import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import jwtDecode from 'jwt-decode';
import { UserData } from "../models/user";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizePrice(number: number) {
  // Convert the number to a string and split it into integer and decimal parts
  const parts = number.toString().split('.');
  
  // Add thousands separators to the integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
  // Join the integer and decimal parts back together with a period as the decimal separator
  return parts.join('.');
}

const transformUserData = (userCredential: any): UserData => {
  let userData = {} as UserData;
  let user = userCredential.user;
  console.log('user: ', user);
  const { accessToken, emailVerified, refreshToken } = user;
  const tokenDecoded: any = jwtDecode(accessToken);

  userData.id = user.uid;
  userData.userName = user.displayName || user.email || 'Untitled';
  userData.avatar = user.photoUrl || '';
  userData.exp = tokenDecoded.exp || '';
  userData.email = user.email || '';
  userData.emailVerified = emailVerified || false;
  userData.accessToken = accessToken || '';
  userData.refreshToken = refreshToken || '';

  return userData;
};

const transformGoogleUser = (userCredential: any): UserData => {
  let userData = {} as UserData;
  const accessToken = userCredential.accessToken;
  const tokenDecoded: any = jwtDecode(userCredential.accessToken);

  userData.id = userCredential.uid;
  userData.userName = userCredential.displayName || userCredential.email || 'Untitled';
  userData.avatar = userCredential.photoUrl || '';
  userData.exp = tokenDecoded.exp || '';
  userData.email = userCredential.email || '';
  userData.emailVerified = userCredential.emailVerified || false;
  userData.accessToken = accessToken || '';

  return userData;
};

// create function to decode token
const decodeToken = (token: string): any => {
  return jwtDecode(token);
};

export { transformUserData, transformGoogleUser, decodeToken };

