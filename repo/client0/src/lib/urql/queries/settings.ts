import { gql } from 'urql';

export const GET_SETTINGS = gql`
  query GetSettings {
    getSettings {
      siteName
      siteEmail
      sitePhone
      siteAddress
      siteDescription
      siteLogo
      siteFavicon
      siteKeywords
      socialLinks {
        facebook
        twitter
        instagram
        youtube
      }
      paymentMethods {
        id
        name
        logo
        isActive
      }
    }
  }
`;