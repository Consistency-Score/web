import { gql } from "@apollo/client";

export const GET_INSIGHTS = gql`
  query {
    insights {
      id
      title
      body
    }
  }
`;



