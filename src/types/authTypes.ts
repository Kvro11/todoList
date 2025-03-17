export interface UserType {
  id: string;
  email: string;
  username: string;
}

export interface AuthState {
  isLoading: boolean;
  user: UserType | null;
  error: null | string;
  userData: UserType | null;
}

export interface SignInType {
  email: string;
  password: string;
}

export interface SignUpType {
  email: string;
  password: string;
  username: string;
}

export interface SignUpType {
  email: string;
  password: string;
  username: string;
}

export interface SocialSignType {
  providerType: "google" | "facebook" | "twitter";
}
