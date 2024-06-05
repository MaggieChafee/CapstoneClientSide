/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

function BookCard({ bookObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={bookObj.imageUrl} />
      <Card.Body>
        <Card.Title>{bookObj.title}</Card.Title>
        <Button variant="primary">View</Button>
      </Card.Body>
    </Card>
  );
}

BookCard.propTypes = {
  bookObj: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default BookCard;
