import { IResolvers } from "@graphql-tools/utils";
import { PubSub } from "graphql-subscriptions";
import { books, authors, Book } from "../data";

const pubsub = new PubSub(); // In a real app, PubSub should be a singleton or passed via context
const BOOK_ADDED = "BOOK_ADDED";

const bookResolvers: IResolvers = {
  Query: {
    books: (
      _: any,
      args: { title?: string; limit?: number; offset?: number },
    ) => {
      let filteredBooks = books;
      if (args.title) {
        filteredBooks = filteredBooks.filter((book) =>
          book.title.toLowerCase().includes(args.title!.toLowerCase()),
        );
      }
      if (args.limit !== undefined && args.offset !== undefined) {
        return filteredBooks.slice(args.offset, args.offset + args.limit);
      }
      return filteredBooks;
    },
    book: (_: any, args: { id: string }) =>
      books.find((book) => book.id === args.id),
  },
  Book: {
    author: (parent: Book) =>
      authors.find((author) => author.id === parent.authorId),
  },
  Mutation: {
    addBook: (_: any, args: { input: { title: string; authorId: string } }) => {
      const book: Book = {
        id: String(books.length + 1),
        title: args.input.title,
        authorId: args.input.authorId,
      };
      books.push(book);
      pubsub.publish(BOOK_ADDED, { bookAdded: book });
      return book;
    },
    deleteBook: (_: any, args: { id: string }) => {
      const index = books.findIndex((book) => book.id === args.id);
      if (index === -1) return null;
      const deletedBook = books[index];
      books.splice(index, 1);
      return deletedBook;
    },
    updateBook: (_: any, args: { id: string; title: string }) => {
      const index = books.findIndex((book) => book.id === args.id);
      if (index === -1) return null;
      books[index].title = args.title;
      return books[index];
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => (pubsub as any).asyncIterator([BOOK_ADDED]),
    },
  },
};

export default bookResolvers;
