import { mergeTypeDefs } from "@graphql-tools/merge";
import { bookTypeDefs } from "./book";
import { authorTypeDefs } from "./author";

const typeDefs = mergeTypeDefs([bookTypeDefs, authorTypeDefs]);

export default typeDefs;
