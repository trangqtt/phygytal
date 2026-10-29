import { UserRank } from './user';

export type LeaderBoardType = {
  ranks: UserRank[];
  userRank: UserRank;
};

export type CheatedUser = {
  eventId: string;
  userId: string;
  sessionId: string;
  cheatingDistance: number;
  totalDistance: number;
};

export type UserInfo = {
  email: string;
  username: string;
  avatar2D?: string;
};

export type ReportRunner = {
  id: string;
  eventId: string;
  userId: string;
  banned: boolean;
  bib: string;
  campaignId: object;
  city: string;
  clubId: object;
  country: string;
  createdAt: Date;
  distance: number;
  gender: 'male' | 'female';
  rank: number;
  state: 1 | 2 | 3;
  totalDistance: number;
  totalRunningTime?: number;
  type: string;
  currentTime: Date;
  finishTime?: Date;
  startTime: Date;
  registerInfo?: {
    name: string;
    phoneNumber: string;
  };
  pace?: number;
  user_info: UserInfo;
};
