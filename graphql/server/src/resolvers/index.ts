import { mergeResolvers } from "@graphql-tools/merge";
import bookResolvers from "./book";
import authorResolvers from "./author";

const resolvers = mergeResolvers([bookResolvers, authorResolvers]);

export default resolvers;
