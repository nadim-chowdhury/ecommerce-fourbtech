import { gql } from "@apollo/client";

export const MY_VENDOR_QUERY_GQL = gql`
  query MyVendor {
    vendor {
      id
      name
      createdAt
      updatedAt
      userId
    }
  }
`;
