import { gql } from 'urql';

export const REDEEM_POINTS = gql`
  mutation RedeemPoints($input: RedeemPointsInput!) {
    redeemPoints(input: $input) {
      id
      points
      type
      description
      createdAt
    }
  }
`;

export const CREATE_POINT_TRANSACTION = gql`
  mutation CreatePointTransaction($input: CreatePointTransactionInput!) {
    createPointTransaction(input: $input) {
      id
      points
      type
      description
      createdAt
    }
  }
`;