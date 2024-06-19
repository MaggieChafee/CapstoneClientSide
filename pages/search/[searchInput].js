/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import searchBook from '../../api/searchData';
import BookCard from '../../components/cards/bookCard';

export default function Search() {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const router = useRouter();
  const { searchInput } = router.query;

  const searchForBooks = () => {
    searchBook(searchInput).then(setFilteredBooks);
    if (filteredBooks === undefined) {
      setFilteredBooks([]);
    }
  };

  useEffect(() => {
    if (searchInput) {
      searchForBooks();
    }
    return () => {
      setFilteredBooks([]);
    };
  }, [searchInput]);

  return (
    <div className="all-books-page-container">
      <h1>Search Results</h1>
      <div className="all-books-container">
        {filteredBooks.length === 0 ? (<h4>No results found.</h4>) : (filteredBooks.map((book) => (
          <BookCard key={book.Id} bookObj={book} />
        )))}
      </div>
    </div>

  );
}
