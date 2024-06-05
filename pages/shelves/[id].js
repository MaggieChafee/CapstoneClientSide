import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleShelf } from '../../api/shelfData';

function ViewSingleShelf() {
  const [shelfDetails, setShelfDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const shelf = () => {
    getSingleShelf(id).then(setShelfDetails);
  };

  useEffect(() => {
    shelf();
  });

  return (
    <h1>{shelfDetails.name}</h1>
  );
}

export default ViewSingleShelf;
