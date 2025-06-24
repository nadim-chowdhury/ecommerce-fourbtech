import { gql } from "@apollo/client";

export const MY_VENDOR_QUERY_GQL = gql`
  query MyVendor {
    vendor {
      id
      name
      userId
      createdAt
      updatedAt
    }
  }
`;

export const ALL_PRODUCTS_QUERY_GQL = gql`
  query AllProducts {
    products {
      id
      name
      description
      sku
      price
      salePrice
      stock
      isActive
      category
      brand
      model
      condition
      imageUrl
      tags
      vendorId
      createdAt
      updatedAt
    }
  }
`;

export const SELLER_PRODUCTS_QUERY_GQL = gql`
  query SellerProducts {
    products {
      id
      name
      sku
      price
      stock
      # status
      category
    }
  }
`;

export const VENDOR_PRODUCTS_QUERY_GQL = gql`
  query VendorProducts($vendorId: String!) {
    vendorProducts(vendorId: $vendorId) {
      id
      name
      sku
      price
      stock
      isActive
      category
      brand
      model
      condition
      createdAt
      updatedAt
    }
  }
`;

export const PRODUCT_QUERY_GQL = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
      name
      description
      category
      brand
      model
      storage
      ram
      color
      condition
      features
      price
      salePrice
      stock
      sku
      tags
      seoTitle
      seoDescription
      imageUrl
    }
  }
`;

export const MY_CART_QUERY_GQL = gql`
  query MyCart {
    myCart {
      id
      items {
        id
        quantity
        product {
          id
          name
          description
          price
          imageUrl
          stock
          vendorId
        }
      }
    }
  }
`;

export const MY_WISHLIST_QUERY_GQL = gql`
  query MyWishlist {
    myWishlist {
      id
      items {
        id
        product {
          id
          name
          description
          price
          imageUrl
          stock
          vendor {
            id
            name
          }
        }
      }
    }
  }
`;
