export interface User {
  _id: string;
  email: string;
  fullName: string;
  profilePic?: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  text?: string;
  image?: string;
  seen: boolean;
  createdAt: string;
  updatedAt?: string;
}

export type AuthState = "signup" | "login";

export interface UserCredentials {
  fullName: string;
  email: string;
  password: string;
  bio: string;
}

export interface ProfileUpdate {
  fullName?: string;
  bio?: string;
  profilePic?: string;
}

export type UnseenMessages = Record<string, number>;
