import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOOK, GET_BOOKS } from "../graphql/operations";

export function AddBook() {
  const [addBook] = useMutation(ADD_BOOK);
  const [title, setTitle] = useState("");
  const [authorId, setAuthorId] = useState("1");

  const handleAddBook = async (e) => {
    e.preventDefault();
    await addBook({
      variables: { input: { title, authorId } },
      refetchQueries: [{ query: GET_BOOKS }], // Refetch books after adding
    });
    setTitle("");
  };

  return (
    <div className="card">
      <h2>Add Book</h2>
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
          <option value="1">Kate Chopin</option>
          <option value="2">Paul Auster</option>
        </select>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
