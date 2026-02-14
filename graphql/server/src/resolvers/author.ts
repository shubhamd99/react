import { IResolvers } from "@graphql-tools/utils";
import { books, authors, Author } from "../data";

const authorResolvers: IResolvers = {
  Query: {
    authors: () => authors,
  },
  Author: {
    books: (parent: Author) =>
      books.filter((book) => book.authorId === parent.id),
  },
};

export default authorResolvers;
