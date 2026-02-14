export * from "./models/author";
export * from "./models/book";

import { Author } from "./models/author";
import { Book } from "./models/book";

export const authors: Author[] = [
  { id: "1", name: "Kate Chopin" },
  { id: "2", name: "Paul Auster" },
];

export const books: Book[] = [
  {
    id: "1",
    title: "The Awakening",
    authorId: "1",
  },
  {
    id: "2",
    title: "City of Glass",
    authorId: "2",
  },
];
