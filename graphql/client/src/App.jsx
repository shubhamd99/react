import "./App.css";
import BookList from "./components/BookList";
import { AddBook } from "./components/AddBook";
import { SubscriptionListener } from "./components/SubscriptionListener";

function App() {
  return (
    <>
      <h1>GraphQL Library</h1>
      <AddBook />
      <BookList />
      <SubscriptionListener />
    </>
  );
}

export default App;
