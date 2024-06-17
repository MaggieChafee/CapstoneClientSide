/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import { getUsersShelves } from '../../api/shelfData';
import BookShelfCard from '../cards/bookShelfCard';

function BookShelfForm() {
  const [userShelves, setUserShelves] = useState([]);
  const { user } = useAuth();
  const shelves = () => {
    getUsersShelves(user.id).then(setUserShelves);
  };

  useEffect(() => {
    shelves();
  }, [user]);

  return (
    <>
      <div className="bookshelf-create-form">
        {userShelves.map((shelf) => (
          <BookShelfCard key={shelf.id} shelfObj={shelf} />
        ))}
      </div>
    </>
  );
}

export default BookShelfForm;
