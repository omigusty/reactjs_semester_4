import React, { useEffect, useState } from "react";
import EditBook from "./EditBook";

export default function AddBook() {
  const [books, setBooks] = useState([]);
  const [bookTitle, setBookTitle] = useState("");
  const [ISBN, setISBN] = useState("");
  const [description, setDescription] = useState("");
  const [editBook, setEditBook] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await fetch("http://localhost:3000/api/book");
    const data = await response.json();
    setBooks(data);
  };

  const addBook = async () => {
    const response = await fetch("http://localhost:3000/api/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookTitle, ISBN, description }),
    });
    const data = await response.json();
    setBooks([...books, data]);
  };

  const updateBook = async (id, newBook) => {
    const response = await fetch(`http://localhost:3000/api/book/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });
    const data = await response.json();
    setBooks(books.map((book) => (book._id === id ? { ...data } : book)));
  };

  const deleteBook = async (id) => {
    await fetch(`http://localhost:3000/api/book${id}`, {
      method: "DELETE",
    });
    setBooks(books.filter((book) => book._id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addBook();
    setBookTitle("");
    setDescription("");
    setISBN("");
  };

  const handleEditClick = (book) => {
    setEditBook(book);
  };

  const handleCancelEdit = (book) => {
    setEditBook();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Judul Buku
          <input
            type="text"
            value={bookTitle}
            onChange={(event) => setBookTitle(event.target.value)}
          />
        </label>
        <label>
          ISBN
          <input
            type="text"
            value={ISBN}
            onChange={(event) => setISBN(event.target.value)}
          />
        </label>
        <label>
          Deskripsi
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <button type="submit">Tambah Buku</button>
      </form>
      <br />
      <table className="tableBook">
        <thead>
          <tr>
            <th>Judul Buku</th>
            <th>ISBN</th>
            <th>Deskripsi</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.bookTitle}</td>
              <td>{book.ISBN}</td>
              <td>{book.description}</td>
              <td>
                <button onClick={() => handleEditClick(book)}>Edit</button>
              </td>
              <td>
                <button onClick={() => deleteBook(book._id)}>Delete</button>
              </td>
              <td>
                <button onClick={() => handleCancelEdit(books)}>Batal</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {editBook && <EditBook book={editBook} updateBook={updateBook} />}
      </div>
    </div>
  );
}
