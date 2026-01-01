import { IBaseEntity } from '@/interfaces/Common';

export interface IProduct {
  name: string;
  quota: string;
  bwlimit: string;
  price: number;
  maxaddon: string;
  maxsub: string;
  maxpop: string;
  maxftp: string;
  maxsql: string;
  maxemailaccT_QUOTA: string | null;
  maX_EMAIL_PER_HOUR: string;
  maxpassengerapps: string;
  ip: string;
  id: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt: string | null; // ISO date string or null
  isDeleted: boolean;
}

export interface IOrderModel {
  ownBy: string; // required
  isActive?: boolean; // defaults to true
  packageName: string; // required
  productType: string; // required
  expiryDate: string; // ISO string (Date in C#)
  domainName: string; // required
  payedAmount?: number; // optional, defaults to 0
  hostedUsername: string; // required
  hostedPassword: string; // required
}

export interface IPlatformService extends IBaseEntity {
  name: string;
  description: string;
  imageURL: string | File;
}

export interface IAppUser {
  id: string; // usually a GUID
  userName: string;
  normalizedUserName?: string;
  email?: string;
  normalizedEmail?: string;
  emailConfirmed?: boolean;
  passwordHash?: string;
  securityStamp?: string;
  concurrencyStamp?: string;
  phoneNumber?: string;
  phoneNumberConfirmed?: boolean;
  twoFactorEnabled?: boolean;
  lockoutEnd?: string; // ISO date string
  lockoutEnabled?: boolean;
  accessFailedCount?: number;

  // Extra fields
  fullName: string;
  address: string;
}

export interface IOrder extends IBaseEntity {
  ownBy: string;
  isActive: boolean;
  packageName: string;
  producttype: string;
  expiryDate: string;
  domainName: string;
  payedAmount: number;
  hostedUsername: string;
  hostedPassword: string;
  nameserver1?: string;
  nameserver2?: string;
}

export interface IFormSubmission extends IBaseEntity {
  name: string;
  email: string;
  details: string;
  servicetype: string;
}

export interface ITestimonial extends IBaseEntity {
  name: string;
  designation: string;
  quote: string;
  imageURL: string | File;
}

export interface IWhyChooseUs extends IBaseEntity {
  title: string;
  description: string;
  imageURL: string | File;
}

export interface ITicket extends IBaseEntity {
  title: string;
  description: string;
  userId: string;
  status: string;
}

export interface ITicketChat extends IBaseEntity {}
