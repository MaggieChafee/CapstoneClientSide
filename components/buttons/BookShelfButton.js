/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../utils/context/authContext';
import {
  deleteBookFromShelf,
  getBookShelfUsingBookIdAndShelfId, getUsersShelves, shelfCheck,
} from '../../api/shelfData';
import BookShelfCard from '../cards/bookShelfCard';

function BookShelfButton({ shelfObj, onUpdate }) {
  const [userShelves, setUserShelves] = useState([]);
  const [currentShelf, setCurrentShelf] = useState(shelfObj);
  const [show, setShow] = useState(false);
  const [bookShelf, setBookShelf] = useState({});
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

  const bookShelfId = () => {
    const getIdPayload = {
      bookId: Number(id),
      shelfId: currentShelf.id,
    };
    getBookShelfUsingBookIdAndShelfId(getIdPayload).then(setBookShelf);
  };

  useEffect(() => {
    const getEverything = () => {
      settingText();
      shelves();
      bookShelfId();
    };

    if (user && id) {
      getEverything();
    }
  }, [user, id]);

  const deleteThisBookShelf = () => {
    deleteBookFromShelf(bookShelf.id).then(setShow(false)).then(() => onUpdate());
  };

  const editIcon = <FontAwesomeIcon icon={faPen} style={{ color: '#ffffff' }} />;
  return (
    <>
      <Button className="bookshelf-button" variant="dark" onClick={handleShow}>{currentShelf.name ? currentShelf.name : 'Loading'} {editIcon}</Button>
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
            <Button variant="dark" className="bookshelf-delete" onClick={deleteThisBookShelf}>Delete Book From Shelves</Button>
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
  onUpdate: PropTypes.func.isRequired,
};

export default BookShelfButton;
