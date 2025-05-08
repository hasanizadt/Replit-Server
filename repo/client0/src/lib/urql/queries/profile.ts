import { gql } from 'urql';

export const GET_PROFILE = gql`
  query GetProfile {
    getProfile {
      id
      email
      username
      fullName
      avatar
      phone
      isVerified
      twoFactorEnabled
      role
      status
      createdAt
      updatedAt
      addresses {
        id
        fullName
        phone
        address
        city
        state
        country
        zipCode
        isDefault
      }
      points {
        available
        used
        total
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      id
      email
      username
      fullName
      avatar
      phone
      isVerified
      twoFactorEnabled
      role
      status
      createdAt
      updatedAt
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      success
      message
    }
  }
`;