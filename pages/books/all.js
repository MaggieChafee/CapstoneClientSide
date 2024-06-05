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
      <div className="page-container">
        <h1>Browse All Books</h1>
        <div>
          {allBooks.map((book) => (
            <BookCard key={book.id} bookObj={book} />
          ))}
        </div>
      </div>
    </>
  );
}
