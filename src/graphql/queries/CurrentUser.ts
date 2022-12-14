import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query {
    currentUser {
      id
      username
      email
      passwordDigest
      isSuperadmin
    }
  }
`;
