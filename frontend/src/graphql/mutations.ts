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

export const CREATE_PRODUCT_MUTATION_GQL = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      description
      price
      stock
      category
      brand
      model
      sku
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_PRODUCT_MUTATION_GQL = gql`
  mutation UpdateProduct($id: String!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      description
      price
      stock
      category
      brand
      model
      sku
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_PRODUCT_MUTATION_GQL = gql`
  mutation DeleteProduct($id: String!) {
    removeProduct(id: $id) {
      id
      name
    }
  }
`;

export const UPDATE_VENDOR_MUTATION_GQL = gql`
  mutation UpdateVendor($input: UpdateVendorInput!) {
    updateVendor(input: $input) {
      id
      name
      userId
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_VENDOR_MUTATION_GQL = gql`
  mutation CreateVendor($input: CreateVendorInput!) {
    createVendor(input: $input) {
      id
      name
      userId
      createdAt
      updatedAt
    }
  }
`;
