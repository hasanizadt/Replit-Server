import { gql } from "urql";

export const GET_PROFILE = gql`
query getUserById($id: String!) {
    getUserById(id: $id) {
      id
      name
      phone
      email
      avatarUrl
    }
}
`;

export const UPDATE_PROFILE = gql`
mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      name
      email
      phone
      role
      avatarUrl
    }
}
`;

export const UPDATE_PASSWORD = gql`
mutation changePassword($changePasswordInput: ChangePasswordInput!) {
    changePassword(changePasswordInput: $changePasswordInput) {
      success
      message
    }
}
`;