
import { gql } from 'urql';

export const GET_ADDRESSES = gql`
  query GetAddresses {
    addresses {
      id
      title
      address
      city
      state
      postalCode
      phone
      isDefault
    }
  }
`;

export const GET_ADDRESS = gql`
  query GetAddress($id: ID!) {
    address(id: $id) {
      id
      title
      address
      city
      state
      postalCode
      phone
      isDefault
    }
  }
`;
