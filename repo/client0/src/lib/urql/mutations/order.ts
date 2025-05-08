import { gql } from 'urql';

export const CREATE_PREORDER = `
  mutation CreatePreorder($input: CreatePreorderInput!) {
    createPreorder(input: $input) {
      id
      name
      email
      phone
      productLink
      description
      status
      createdAt
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
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

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($input: UpdateOrderStatusInput!) {
    updateOrderStatus(input: $input) {
      id
      status
    }
  }
`;