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

export const ADD_TO_CART_GQL = gql`
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      id
      quantity
      product {
        id
        name
        price
        imageUrl
        stock
      }
    }
  }
`;

export const UPDATE_CART_ITEM_GQL = gql`
  mutation UpdateCartItem($input: UpdateCartItemInput!) {
    updateCartItem(input: $input) {
      id
      quantity
      product {
        id
        name
        price
        imageUrl
        stock
      }
    }
  }
`;

export const REMOVE_FROM_CART_GQL = gql`
  mutation RemoveFromCart($cartItemId: String!) {
    removeFromCart(cartItemId: $cartItemId) {
      id
    }
  }
`;

export const ADD_TO_WISHLIST_GQL = gql`
  mutation AddToWishlist($input: AddToWishlistInput!) {
    addToWishlist(input: $input) {
      id
      items {
        id
        product {
          id
          name
        }
      }
    }
  }
`;

export const REMOVE_FROM_WISHLIST_GQL = gql`
  mutation RemoveFromWishlist($input: RemoveFromWishlistInput!) {
    removeFromWishlist(input: $input) {
      id
      items {
        id
      }
    }
  }
`;
