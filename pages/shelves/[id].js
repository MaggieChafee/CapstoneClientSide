/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleShelf } from '../../api/shelfData';
import BookCard from '../../components/cards/bookCard';

function ViewSingleShelf() {
  const [shelfDetails, setShelfDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const shelf = () => {
    getSingleShelf(id).then(setShelfDetails);
  };

  useEffect(() => {
    shelf(id);
  }, [id]);

  return (
    <>
      <h1>{shelfDetails.name}</h1>
      <div>
        {shelfDetails.bookShelves?.map((b) => (
          <BookCard key={b.book.id} bookObj={b.book} />
        ))}
      </div>
    </>
  );
}

export default ViewSingleShelf;
