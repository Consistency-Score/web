import { gql } from "@apollo/client";

export const LOGIN = gql`
  query ($email: String!, $passwordDigest: String!) {
    login(email: $email, passwordDigest: $passwordDigest) 
  }
`;
