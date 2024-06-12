/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { getUsersShelves, shelfCheck } from '../../api/shelfData';
import BookShelfCard from '../cards/bookShelfCard';

function BookShelfButton({ shelfObj }) {
  const [userShelves, setUserShelves] = useState([]);
  const [currentShelf, setCurrentShelf] = useState(shelfObj);
  const [show, setShow] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const handleShow = () => setShow(true);
  const handlClose = () => setShow(false);

  const settingText = () => {
    const payload = {
      bookId: id,
      userId: user.id,
    };
    shelfCheck(payload).then(setCurrentShelf);
    setShow(false);
  };

  const shelves = () => {
    getUsersShelves(user.id).then(setUserShelves);
  };

  useEffect(() => {
    const fetchData = async () => {
      settingText();
      shelves();
    };

    if (user && id) {
      fetchData();
    }
  }, [user, id]);

  return (
    <>
      <Button onClick={handleShow}>{currentShelf.name ? currentShelf.name : 'Loading'}</Button>
      <div>
        <Modal show={show} onHide={handlClose}>
          <Modal.Header closeButton>
            <Modal.Title>Choose a Bookshelf</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {userShelves.map((shelf) => {
              const shelfSelect = shelf.id === shelfObj.id ? 'bookshelf-btn-selected' : 'bookshelf-btn-notselected';
              return (
                <BookShelfCard className={shelfSelect} key={shelf.id} shelfObj={shelf} currentShelf={currentShelf} onUpdate={settingText} />
              );
            })}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Delete Book From Shelves</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

BookShelfButton.propTypes = {
  shelfObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
};

export default BookShelfButton;
