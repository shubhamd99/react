# GraphQL Learning Project

A comprehensive full-stack GraphQL application demonstrating core and advanced concepts using **Node.js** (Apollo Server) and **React** (Apollo Client).

## 🚀 Features

- **Queries**: Fetching complex data with nested relationships (Books -> Authors).
- **Mutations**: Creating, updating, and deleting data using Input Types.
- **Subscriptions**: Real-time updates using WebSockets (`graphql-ws`) when data changes.
- **Advanced**:
  - **Filtering**: Search books by title.
  - **Pagination**: Limit and offset-based pagination.
  - **Input Types**: Structured arguments for mutations.

## 🛠️ Tech Stack

- **Server**:
  - Node.js
  - Express
  - Apollo Server Express
  - GraphQL Tools (Schema merging)
  - `graphql-ws` (WebSockets)
  - `nodemon` (Development)

- **Client**:
  - React (Vite)
  - Apollo Client (`@apollo/client`)
  - GraphQL (`graphql`)

## 📂 Project Structure

```
graphql/
├── server/             # Node.js GraphQL Server
│   ├── index.js        # Entry point (HTTP + WS setup)
│   ├── schema.js       # Type definitions (SDL)
│   ├── resolvers.js    # Business logic
│   └── data.js         # Mock database
└── client/             # React Client
    ├── src/
    │   ├── main.jsx    # Apollo Client config (Split Link)
    │   └── App.jsx     # UI Components (Query, Mutation, Sub)
```

## 🏁 Getting Started

### Prerequisites

- Node.js (v14+)
- npm

### 1. Setup Server

```bash
cd graphql/server
npm install
npm start
```

Server runs at `http://localhost:4000/graphql`

### 2. Setup Client

```bash
cd graphql/client
npm install
npm run dev
```

Client runs at `http://localhost:5173`

## 📚 GraphQL Concepts Demonstrated

### 1. Schema Definition (`schema.js`)

Defines the shape of data and operations.

```graphql
type Book { ... }
type Query { ... }
type Mutation { ... }
type Subscription { ... }
```

### 2. Resolvers (`resolvers.js`)

Functions that generate response for a GraphQL query.

```javascript
Query: {
  books: (parent, args) => { ... }
}
```

### 3. Real-time Subscriptions

Uses `PubSub` to publish events and `AsyncIterator` to listen.

- **Server**: `pubsub.publish('BOOK_ADDED', { ... })`
- **Client**: `useSubscription(BOOK_ADDED)`

## 🧪 Testing

- **GraphQL Playground**: Go to `http://localhost:4000/graphql` to interactively run queries.
- **Client UI**: Use the React app to add books and see real-time alerts.

## 📝 License

MIT
