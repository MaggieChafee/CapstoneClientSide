/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleShelf } from '../../api/shelfData';
import BookShelfDetailsCard from '../../components/cards/shelfDetailsBookCard';

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
      <div className="shelf-details-container">
        <h1>{shelfDetails.name}</h1>
        <div className="shelf-books-container">
          {shelfDetails.bookShelves?.map((b) => (
            <BookShelfDetailsCard key={b.book.id} bookObj={b.book} onUpdate={shelf} />
          ))}
        </div>
      </div>

    </>
  );
}

export default ViewSingleShelf;
