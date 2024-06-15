/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Link from 'next/link';

function BookCard({ bookObj }) {
  return (
    <div className="all-book-card">
      <Link href={`/books/${bookObj.id}/details`} passHref>
        <Card.Img variant="top" className="book-image" src={bookObj.imageUrl} style={{ maxHeight: '15rem', maxWidth: '10rem' }} />
      </Link>
      <Card.Title>{bookObj.title}</Card.Title>
    </div>
  );
}

BookCard.propTypes = {
  bookObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default BookCard;
