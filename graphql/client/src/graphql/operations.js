import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query GetBooks($title: String, $limit: Int, $offset: Int) {
    books(title: $title, limit: $limit, offset: $offset) {
      id
      title
      author {
        name
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($input: AddBookInput!) {
    addBook(input: $input) {
      id
      title
      author {
        name
      }
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription OnBookAdded {
    bookAdded {
      id
      title
      author {
        name
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
      title
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $title: String!) {
    updateBook(id: $id, title: $title) {
      id
      title
      author {
        name
      }
    }
  }
`;
