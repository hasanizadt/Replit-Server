
import { gql } from 'urql';

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($name: String!, $email: String!, $phone: String!) {
    updateProfile(input: { name: $name, email: $email, phone: $phone }) {
      id
      name
      email
      phone
    }
  }
`;
