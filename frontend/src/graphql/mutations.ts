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
      salePrice
      imageUrl
      vendorId
      stock
      isActive
      category
      brand
      model
      storage
      ram
      color
      ram2
      color2
      condition
      sku
      seoTitle
      seoDescription
      enableNegotiation
      tags
      features
      createdAt
      updatedAt
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
