import { gql } from 'urql';

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
      user {
        id
        email
        username
        fullName
        avatar
        role
        isVerified
        twoFactorEnabled
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      accessToken
      refreshToken
      user {
        id
        email
        username
        fullName
        avatar
        role
        isVerified
        twoFactorEnabled
      }
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      success
      message
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token) {
      success
      message
    }
  }
`;