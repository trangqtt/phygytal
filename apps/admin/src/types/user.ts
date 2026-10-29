export type UserData = {
  id: string;
  userName: string;
  avatar: string;
  exp: number;
  email: string;
  emailVerified: boolean;
  accessToken: string;
  refreshToken: string;
  role: string;
};

export type UserRank = {
  avatar2D: string;
  avgPace: number;
  bib: string;
  currentTime: string;
  distance: number;
  finishTime: string;
  gender: string;
  id: string;
  rank: number;
  startTime: string;
  totalDistance: number;
  totalDonation: number;
  totalRunningTime: number;
  totalValidDistance: number;
  username: string;
  visualAvatar: string;
};

export type UserOption = {
  id: string;
  username: string;
  email: string;
};
