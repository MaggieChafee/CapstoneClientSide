import React, { useEffect, useState } from 'react';
import { getAllBooks } from '../../api/bookData';
import BookCard from '../../components/cards/bookCard';

export default function AllBooks() {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    getAllBooks().then(setAllBooks);
  }, []);

  return (
    <>
      <div className="all-books-page-container">
        <h1>Browse All Books</h1>
        <div className="all-books-container">
          {allBooks.map((book) => (
            <BookCard key={book.id} bookObj={book} />
          ))}
        </div>
      </div>
    </>
  );
}
