export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  username: string;
  fullName: string;
}

export interface ResetPasswordInput {
  email: string;
  token: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    username: string;
    fullName: string;
    avatar: string;
    role: string;
    isVerified: boolean;
    twoFactorEnabled: boolean;
  };
}

export interface SuccessResponse {
  success: boolean;
  message: string;
}