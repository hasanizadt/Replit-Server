
import { gql } from 'urql';

export const GET_SHIPPING_ZONES = gql`
  query GetShippingZones {
    getShippingZones {
      id
      name
      areas
      methods {
        id
        name
        price
        isActive
        estimatedDays
      }
    }
  }
`;

export const GET_SHIPPING_METHODS = gql`
  query GetShippingMethods($zoneId: ID!) {
    getShippingMethods(zoneId: $zoneId) {
      id
      name
      price
      isActive
      estimatedDays
    }
  }
`;
