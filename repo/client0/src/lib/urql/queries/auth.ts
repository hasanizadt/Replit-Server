import { gql } from 'urql';

export const GET_PROFILE = gql`
  query GetProfile {
    profile {
      id
      email
      fullName
      phoneNumber
      avatar
      role
      isVerified
      createdAt
      updatedAt
    }
  }
`;

export const GET_SETTINGS = gql`
  query GetSettings {
    settings {
      id
      siteName
      description
      logo
      favicon
      email
      phone
      address
      socialLinks {
        facebook
        twitter
        instagram
      }
    }
  }
`;

export const VERIFY_AUTH = gql`
  query VerifyAuth {
    verifyAuth {
      id
      email
      fullName
    }
  }
`;

export const GET_USER = gql`
  query GetUser {
    user {
      id
      email
      fullName
      role
      isVerified
      createdAt
    }
  }
`;