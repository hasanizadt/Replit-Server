
import { gql } from 'urql';

export const GET_REFUNDS = gql`
  query GetRefunds($limit: Int!, $page: Int!) {
    refunds(limit: $limit, page: $page) {
      id
      orderId
      productId
      reason
      description
      status
      createdAt
      product {
        id
        name
      }
    }
  }
`;

export const GET_REFUNDABLES = gql`
  query GetRefundables($limit: Int!, $page: Int!) {
    refundables(limit: $limit, page: $page) {
      id
      orderId
      productId
      createdAt
      product {
        id
        name
      }
    }
  }
`;
