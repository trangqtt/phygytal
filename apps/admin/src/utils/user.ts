import jwtDecode from 'jwt-decode';
import { UserData } from '../types/user';

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
