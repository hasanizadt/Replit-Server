
import { gql } from 'urql';

export const GET_WISHLIST = gql`
  query GetWishlist($searchInput: SearchWishlistInput) {
    wishlist(searchInput: $searchInput) {
      items {
        id
        product {
          id
          name
          price
          image
        }
      }
      meta {
        total
        currentPage
        lastPage
      }
    }
  }
`;
