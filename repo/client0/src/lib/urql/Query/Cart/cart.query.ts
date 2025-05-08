import { gql } from "urql";

export const ADD_CART = gql`
mutation addToCart($addToCartInput: AddToCartInput!) {
    addToCart(addToCartInput: $addToCartInput) {
      id
      reserved
      attributes
      productId
      sellerId
      createdAt
      updatedAt
    }
}
`;

export const GET_CART = gql`
query getCartSummary {
  getCartSummary {
    totalItems
    subtotal
    discount
    tax
    shipping
    total
  }
}
`;

export const DELETE_CART = gql`
mutation deleteCart($deleteCartId: String!) {
  deleteCart(id: $deleteCartId) {
    success
    message
  }
}
`;

export const INCREASE_CART = gql`
mutation increaseCart($increaseCartId: String!) {
  increaseCart(id: $increaseCartId) {
    success
    message
  }
}
`;

export const DECREASE_CART = gql`
mutation decreaseCart($decreaseCartId: String!) {
  decreaseCart(id: $decreaseCartId) {
    success
    message
  }
}
`;