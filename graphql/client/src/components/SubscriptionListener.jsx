import { useSubscription } from "@apollo/client";
import { BOOK_ADDED } from "../graphql/operations";

export function SubscriptionListener() {
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      console.log("New book added:", data.data.bookAdded);
      alert(`New book added: ${data.data.bookAdded.title}`);
    },
  });
  return null;
}
