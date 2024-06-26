import React, { useEffect, useState } from 'react';
import { getRecentReleases } from '../../api/bookData';
import BookCard from '../../components/cards/bookCard';

export default function RecentBooks() {
  const [recentBooks, setRecentBooks] = useState([]);

  useEffect(() => {
    getRecentReleases().then(setRecentBooks);
  }, []);

  return (
    <>
      <div className="all-books-page-container">
        <h1>Recent Releases</h1>
        <div className="all-books-container">
          {recentBooks.map((book) => (
            <BookCard key={book.id} bookObj={book} />
          ))}
        </div>
      </div>
    </>
  );
}
