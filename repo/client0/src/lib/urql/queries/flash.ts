
import { gql } from 'urql';

export const GET_RUNNING_FLASH = gql`
  query GetRunningFlash($searchInput: SearchFlashInput) {
    runningFlash(searchInput: $searchInput) {
      items {
        id
        title
        startDate
        endDate
        products {
          id
          name
          price
          image
          discount
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

export const GET_FLASH = gql`
  query GetFlash($id: ID!) {
    flash(id: $id) {
      id
      title
      startDate
      endDate
      products {
        id
        name
        price
        image
        discount
      }
    }
  }
`;
