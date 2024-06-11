/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteReview } from '../../api/reviewData';

function ReviewCard({ reviewObj, onUpdate }) {
  const deleteThisReview = () => {
    if (window.confirm('Do you want to delete this review')) {
      deleteReview(reviewObj.id).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{reviewObj.bookTitle}</Card.Title>
        <Card.Subtitle>
          By {reviewObj.userName} on {reviewObj.dateCreated}
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
        <Link href={`/reviews/edit/${reviewObj.id}`} passHref>
          <Button variant="primary">Edit</Button>
        </Link>
        <Button onClick={deleteThisReview}>Delete</Button>
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
  onUpdate: PropTypes.func.isRequired,
};

export default ReviewCard;
