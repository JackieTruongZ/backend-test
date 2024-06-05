export interface User {
  _id: string,
  name: string,
  email: string,
  givenName: string,
  familyName: string,
  verified_email: boolean,
  avatar: string,
  locale: string,
  role: string,
}

export interface UserGoogleAuth {
  googleId: string,
  name: string,
  email: string,
  givenName: string,
  familyName: string,
  verified_email: boolean,
  avatar: string,
  locale: string,
}

export interface UserInfor {
  _id: string,
  teamId: string,
  name: string,
  email: string;
  givenName: string,
  familyName: string,
  verified_email: boolean,
  avatar: string,
  locale: string,
  role: string[],
  gender: string,
  date: Date,
  numberPhone: string,
  address: string,
  googleId: string,
  citizenIdentityCard: string,
  bankInfor: BankInfor,
  accessable: UserInforAccess
}

export interface UserInforAccess {
  _id: boolean,
  teamId: boolean,
  name: boolean,
  email: boolean;
  givenName: boolean,
  familyName: boolean,
  verified_email: boolean,
  avatar: boolean,
  locale: boolean,
  role: boolean,
  gender: boolean,
  date: boolean,
  numberPhone: boolean,
  address: boolean,
  googleId: boolean,
  citizenIdentityCard: boolean,
  bankInfor: boolean,
}

export interface UserPublicInfor {
  _id: string,
  name: string,
  email: string;
  givenName: string,
  familyName: string,
  verified_email: boolean,
  avatar: string,
  locale: string,
  role: string,
  gender: string,
  date: Date,
  numberPhone: string,
  address: string
}

export interface UserPrivateInfor {
  googleId: string,
  citizenIdentityCard: string,
  bankInfor: BankInfor,
}

export interface BankInfor {
  name: string,
  bankName: string,
  bankId: string,
  bankNumber: string
}
