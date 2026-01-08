
export enum AppStep {
  FORM = 'FORM',
  SHARE = 'SHARE',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  SUPPORT = 'SUPPORT',
  EARNINGS = 'EARNINGS',
  WINNERS = 'WINNERS'
}

export interface UserData {
  phonePrimary: string;
  phoneSecondary: string;
  accountName: string;
  province: string;
  gender: string;
  purpose: string;
}