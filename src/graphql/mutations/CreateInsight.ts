import { gql } from "@apollo/client";

export const CREATE_INSIGHT = gql`
  mutation createInsight($title: String!, $body: String!) {
    createInsight(title: $title, body: $body) {
      id
      title
      body
    }
  }
`;
