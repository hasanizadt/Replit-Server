import { gql } from 'urql';

export const GET_CART = gql`
  query GetCart {
    getCart {
      id
      total
      items {
        id
        quantity
        product {
          id
          name
          price
          image
          stock
        }
      }
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      id
      total
      items {
        id
        quantity
        product {
          id
          name
          price
          image
          stock
        }
      }
    }
  }
`;

export const UPDATE_CART = gql`
  mutation UpdateCart($input: UpdateCartInput!) {
    updateCart(input: $input) {
      id
      total
      items {
        id
        quantity
        product {
          id
          name
          price
          image
          stock
        }
      }
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($productId: ID!) {
    removeFromCart(productId: $productId) {
      id
      total
      items {
        id
        quantity
        product {
          id
          name
          price
          image
          stock
        }
      }
    }
  }
`;