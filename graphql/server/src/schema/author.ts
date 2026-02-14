import { gql } from "apollo-server-express";

export const authorTypeDefs = gql`
  type Author {
    id: ID!
    name: String
    books: [Book]
  }

  type Query {
    authors: [Author]
  }
`;
