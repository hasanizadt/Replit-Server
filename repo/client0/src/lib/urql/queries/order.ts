
import { gql } from 'urql';

export const GET_ORDER = gql`
  query GetOrder($id: ID!) {
    order(id: $id) {
      id
      orderNumber
      total
      status
      createdAt
      items {
        id
        quantity
        price
        product {
          id
          name
          image
        }
      }
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders($searchInput: SearchOrderInput) {
    orders(searchInput: $searchInput) {
      items {
        id
        orderNumber
        total
        status
        createdAt
      }
      meta {
        total
        currentPage
        lastPage
      }
    }
  }
`;
