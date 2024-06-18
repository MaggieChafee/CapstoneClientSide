/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteBookFromShelf, getBookShelfUsingBookIdAndShelfId } from '../../api/shelfData';

function BookShelfDetailsCard({ bookObj, onUpdate }) {
  const router = useRouter();
  const { id } = router.query;
  const [bookShelfId, setBookShelfId] = useState(null);

  const bookShelf = () => {
    const payload = {
      bookId: bookObj.id,
      shelfId: id,
    };
    getBookShelfUsingBookIdAndShelfId(payload).then(setBookShelfId);
  };

  const deleteThisBookShelf = () => {
    if (window.confirm('Do you want to delete this book from your shelves?')) {
      deleteBookFromShelf(bookShelfId.id).then(() => onUpdate());
    }
  };

  useEffect(() => {
    bookShelf();
  }, [id]);

  return (
    <div className="all-book-card">
      <Link href={`/books/${bookObj.id}/details`} passHref>
        <Card.Img variant="top" className="book-image" src={bookObj.imageUrl} style={{ maxHeight: '15rem', maxWidth: '10rem' }} />
      </Link>
      <Card.Text>{bookObj.title}</Card.Text>
      <Button variant="dark" className="sign-out-button" onClick={deleteThisBookShelf}><FontAwesomeIcon icon={faTrash} style={{ color: '#FFFFFF' }} /></Button>
    </div>
  );
}

BookShelfDetailsCard.propTypes = {
  bookObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BookShelfDetailsCard;
