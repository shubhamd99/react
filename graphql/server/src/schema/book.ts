import { gql } from "apollo-server-express";

export const bookTypeDefs = gql`
  type Book {
    id: ID!
    title: String
    author: Author
  }

  input AddBookInput {
    title: String!
    authorId: ID!
  }

  type Query {
    books(title: String, limit: Int, offset: Int): [Book]
    book(id: ID!): Book
  }

  type Mutation {
    addBook(input: AddBookInput!): Book
    deleteBook(id: ID!): Book
    updateBook(id: ID!, title: String!): Book
  }

  type Subscription {
    bookAdded: Book
  }
`;
