import { gql } from 'urql';

export const GET_SELLER = gql`
  query GetSeller($searchInput: SearchInput!) {
    getSellers(input: $searchInput) {
      meta {
        totalCount
        currentPage
        totalPages
        itemsPerPage
      }
      sellers {
        id
        name
        email
        phone
        shopName
        logo
        banner
        status
        isVerified
        rating
        totalProducts
        totalOrders
      }
    }
  }
`;

export const GET_SELLERS = gql`
  query GetSellers($searchInput: SearchSellerInput) {
    sellers(searchInput: $searchInput) {
      items {
        id
        name
        description
        logo
        rating
        isVerified
      }
      meta {
        total
        currentPage
        totalPages
        perPage
      }
    }
  }
`;