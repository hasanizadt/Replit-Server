import { gql } from 'urql';

export const CREATE_REFUND = gql`
  mutation CreateRefund($input: CreateRefundInput!) {
    createRefund(input: $input) {
      id
      reason
      status
      amount
      createdAt
      order {
        id
        orderNumber
      }
    }
  }
`;

export const UPDATE_REFUND_STATUS = gql`
  mutation UpdateRefundStatus($input: UpdateRefundStatusInput!) {
    updateRefundStatus(input: $input) {
      id
      status
    }
  }
`;