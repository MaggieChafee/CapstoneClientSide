/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ReviewCard({ reviewObj }) {
  const formatDateTimeToDate = (dateTime) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{reviewObj.bookTitle}</Card.Title>
        <Card.Subtitle>
          By {reviewObj.userName} on {formatDateTimeToDate(reviewObj.dateCreated)}
        </Card.Subtitle>
        <Card.Text>
          {reviewObj.rating > 0 && [...Array(reviewObj.rating)].map(() => <p>★</p>)}
        </Card.Text>
        <Card.Text>
          {reviewObj.userName}
        </Card.Text>
        <Card.Text>
          {reviewObj.comment}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

ReviewCard.propTypes = {
  reviewObj: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    bookId: PropTypes.number,
    dateCreated: PropTypes.string,
    rating: PropTypes.number,
    userName: PropTypes.string,
    comment: PropTypes.string,
    bookTitle: PropTypes.string,
  }).isRequired,
};

export default ReviewCard;
