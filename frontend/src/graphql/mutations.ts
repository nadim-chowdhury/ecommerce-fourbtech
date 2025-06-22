import { gql } from "@apollo/client";

export const LOGIN_MUTATION_GQL = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      access_token
      user {
        id
        email
        name
        role
        createdAt
        updatedAt
        vendorId
      }
    }
  }
`;

export const REGISTER_MUTATION_GQL = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      access_token
      user {
        id
        email
        name
        role
        createdAt
        updatedAt
        vendorId
      }
    }
  }
`;
