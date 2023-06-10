import React, { useState } from "react";

export default function EditBook({ book, updateBook }) {
  const [editedBook, setEditedBook] = useState(book);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleUpdateClick = () => {
    updateBook(book._id, editedBook);
  };
  return (
    <div>
      <h2>Edit Book</h2>
      <label>
        Judul Buku
        <input
          type="text"
          name="bookTitle"
          value={editedBook.bookTitle}
          onChange={handleInputChange}
        />
      </label>
      <label>
        ISBN
        <input
          type="text"
          name="ISBN"
          value={editedBook.ISBN}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Deskripsi
        <input
          type="text"
          name="description"
          value={editedBook.description}
          onChange={handleInputChange}
        />
      </label>
      <button onClick={handleUpdateClick}>Update</button>
    </div>
  );
}
