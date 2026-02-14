import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BOOKS, DELETE_BOOK, UPDATE_BOOK } from "../graphql/operations";

function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });
  const [updateBook] = useMutation(UPDATE_BOOK);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      deleteBook({ variables: { id } });
    }
  };

  const startEditing = (book) => {
    setEditingId(book.id);
    setEditTitle(book.title);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
  };

  const handleUpdate = (id) => {
    updateBook({ variables: { id, title: editTitle } });
    setEditingId(null);
  };

  return (
    <div className="book-list-container">
      <h2>Book List</h2>
      <ul className="book-list">
        {data.books.map((book) => (
          <li key={book.id} className="book-item">
            {editingId === book.id ? (
              <div className="edit-mode">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={() => handleUpdate(book.id)}>Save</button>
                <button onClick={cancelEditing}>Cancel</button>
              </div>
            ) : (
              <div className="view-mode">
                <span>
                  <strong>{book.title}</strong> by {book.author.name}
                </span>
                <div className="actions">
                  <button onClick={() => startEditing(book)}>Edit</button>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
