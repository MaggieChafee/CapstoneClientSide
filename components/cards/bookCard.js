/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import Link from 'next/link';

function BookCard({ bookObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={bookObj.imageUrl} />
      <Card.Body>
        <Card.Title>{bookObj.title}</Card.Title>
        <Link href={`/books/${bookObj.id}`} passHref>
          <Button variant="primary">View</Button>
        </Link>
      </Card.Body>
    </Card>
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
