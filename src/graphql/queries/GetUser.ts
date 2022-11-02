import { gql } from "@apollo/client";

export const GET_USER = gql`
  query {
    insight(id: 1) {
      title
    }
  }
`;
