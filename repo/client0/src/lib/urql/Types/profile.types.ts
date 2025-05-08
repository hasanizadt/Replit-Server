export interface ProfileData {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  role: string;
  points: number;
  createdAt: string;
}

export interface UpdateProfileInput {
  name?: string;
  phone?: string;
  avatar?: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}