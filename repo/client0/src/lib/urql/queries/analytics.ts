
import { gql } from 'urql';

export const GET_ANALYTICS = gql`
  query GetAnalytics($input: AnalyticsQueryInput!) {
    analytics(input: $input) {
      ordersCount
      totalRevenue
      averageOrderValue
      topSellingProducts {
        id
        name
        sales
      }
    }
  }
`;
