import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleShelf } from '../../api/shelfData';
import { getBooksByShelfId } from '../../api/bookData';
import BookCard from '../../components/cards/bookCard';

function ViewSingleShelf() {
  const [shelfDetails, setShelfDetails] = useState({});
  const [books, setBooks] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const shelf = () => {
    getSingleShelf(id).then(setShelfDetails);
    getBooksByShelfId(id).then(setBooks);
  };

  useEffect(() => {
    shelf();
  });

  return (
    <>
      <h1>{shelfDetails.name}</h1>
      <div>
        {books.map((book) => (
          <BookCard key={book.id} bookObj={book} />
        ))}
      </div>
    </>
  );
}

export default ViewSingleShelf;
