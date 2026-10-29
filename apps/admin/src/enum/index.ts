/* eslint-disable indent */
export enum EventParticipantTypeEnum {
  ALL = 'all',
  CLUB = 'club',
  INDIVIDUAL = 'individual',
}

export enum EventRankTypeEnum {
  PACE = 'pace',
  DISTANCE = 'distance',
}

export enum EventVisibilityEnum {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export enum EventTypeEnum {
  RUN = 'run',
  TRAIL = 'trail',
  CHALLENGE = 'challenge',
}

export enum EventDisplayTypeEnum {
  NORMAL = 'normal',
  PROGRESS = 'progress',
}

export enum EventMediaTypeEnum {
  IMAGE = 'image',
}

export enum EventRewardTypeEnum {
  NFT = 'nft',
  COUPON = 'coupon',
  PHYSICAL = 'physical',
}

export enum EventRunnerOptionsTypeEnum {
  DISTANCE = 'distance',
  TIME = 'time',
}

export enum EventRewardTargetEnum {
  CLUB = 'club',
  INDIVIDUAL = 'individual',
  ALL = 'all',
}

export enum EventRewardListEnum {
  TOP_RUNNER = 'Top Runner',
  RANK_RUNNER = 'Rank Runner',
  FINISHER = 'Finisher',
  RANDOM_RUNNER = 'Random Runner',
  RANDOM_VIEWER = 'Random Viewer',
}

export enum EventStatsConfigsTypeEnum {
  DISTANCE_PROGRESS = 'distance_progress',
  TOTAL_DONATION = 'total_donation',
  TOTAL_DISTANCE = 'total_distance',
  TOTAL_FINISHER = 'total_finisher',
  TOTAL_ACTIVE_RUNNER = 'total_active_runner',
  TOTAL_DISTANCE_MILESTONE_ACHIEVER = 'total_distance_milestone_achiever',
  TOTAL_LOCATION = 'total_location',
  TOTAL_COUNTRIES = 'total_countries',
  TOTAL_REGISTERED = 'total_registered',
  TOTAL_PARTICIPANT_CLUB = 'total_participant_club',
}

export enum EventGrantedTypeEnum {
  REGISTER = 'register',
  SUBSCRIBE = 'subscribe',
  NONE = 'none',
}

export const mapStringWithEnum = (string: string): any => {
  switch (string) {
    case 'participantType':
      return EventParticipantTypeEnum;
    case 'rankType':
      return EventRankTypeEnum;
    case 'rewards.displayType':
      return EventDisplayTypeEnum;
    case 'rewards.mediaType':
      return EventMediaTypeEnum;
    case 'rewards.type':
      return EventRewardTypeEnum;
    case 'rewards.target':
      return EventRewardTargetEnum;
    case 'runnerOptions.type':
      return EventRunnerOptionsTypeEnum;
    case 'rewards.condition.type':
      return EventRunnerOptionsTypeEnum;
    case 'statsConfigs.type':
      return EventStatsConfigsTypeEnum;
    case 'statsConfigs.visibility':
      return EventVisibilityEnum;
    case 'type':
      return EventTypeEnum;
    case 'visibility':
      return EventVisibilityEnum;
    case 'rewardList':
      return EventRewardListEnum;
    case 'mode':
      return NotificationModeEnum;
    case 'receiverType':
      return NotificationReceiverTypeEnum;
    case 'notificationType':
      return NotificationTypeEnum;
    case 'grantedType':
      return EventGrantedTypeEnum;
    default:
      return {};
  }
};

export enum NotificationModeEnum {
  PUSH = 'push',
  SILENT = 'silent',
}

export enum NotificationReceiverTypeEnum {
  SYSTEM = 'system',
  EVENTS = 'events',
  CLUB = 'clubs',
  USERS = 'users',
}

export enum NotificationTypeEnum {
  SYSTEM = 'system',
  EVENT = 'event',
  CLUB = 'club',
  REWARD = 'reward',
  REWARDS = 'rewards',
}

export enum ReportLeaderboardType {
  PERSONAL = 'personal',
  CLUB = 'club',
}

export enum ReportGenderType {
  MALE = 'male',
  FEMALE = 'female',
}

export enum InputTypeEnum {
  TEXT = 'text',
  INTEGER = 'integer',
  FLOAT = 'float',
}

export enum ProductTabEnum {
  INFO = 'info',
  MODEL = 'model',
  TRANSLATION = 'translation',
  THEME = 'theme',
  ITEM = 'item',
}
