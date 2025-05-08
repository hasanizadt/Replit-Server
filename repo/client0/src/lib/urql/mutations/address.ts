
import { gql } from 'urql';

export const ADD_ADDRESS = gql`
  mutation AddAddress($input: AddAddressInput!) {
    addAddress(input: $input) {
      id
      title
      address
      city
      state
      postalCode
      phone
    }
  }
`;

export const UPDATE_ADDRESS = gql`
  mutation UpdateAddress($id: ID!, $input: UpdateAddressInput!) {
    updateAddress(id: $id, input: $input) {
      id
      title
      address
      city
      state
      postalCode
      phone
    }
  }
`;

export const DELETE_ADDRESS = gql`
  mutation DeleteAddress($id: ID!) {
    deleteAddress(id: $id) {
      success
      message
    }
  }
`;
