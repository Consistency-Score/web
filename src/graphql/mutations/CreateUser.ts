import { gql } from "@apollo/client";


export const CREATE_USER = gql`
  mutation createUser(
    $username: String!
    $email: String!
    $passwordDigest: String!
    $firstName: String
    $lastName: String
    $headline: String
    $bio: String
  ) {
    createUser(
      username: $username
      email: $email
      passwordDigest: $passwordDigest
      firstName: $firstName
      lastName: $lastName
      headline: $headline
      bio: $bio
    ) {
      id
      username
      passwordDigest
    }
  }
`;

// export const CREATE_USER = gql`
//   mutation createUser($user: UserInputType!) {
//     createUser(user: $user) {
//       username
//       email
//       passwordDigest
//     }
//   }
// `;
