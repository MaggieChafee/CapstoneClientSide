/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteReview } from '../../api/reviewData';
import { useAuth } from '../../utils/context/authContext';

function ReviewCard({ reviewObj, onUpdate }) {
  const { user } = useAuth();
  const [buttonDisplay, setButtonDisplay] = useState(false);

  const userCheck = () => {
    if (reviewObj.userId === user.id) {
      setButtonDisplay(true);
    } else {
      setButtonDisplay(false);
    }
  };

  const deleteThisReview = () => {
    if (window.confirm('Do you want to delete this review')) {
      deleteReview(reviewObj.id).then(() => onUpdate());
    }
  };

  useEffect(() => {
    userCheck();
  }, [user]);

  return (
    <Card className="review-card">
      <Card.Body>
        <Card.Title>{reviewObj.bookTitle}</Card.Title>
        <Card.Subtitle className="subtitle">
          By {reviewObj.userName} on {reviewObj.dateCreated}
        </Card.Subtitle>
        <div className="review-stars">
          <Card.Text>
            {reviewObj.rating > 0 && [...Array(reviewObj.rating)].map(() => <span>★</span>)}
          </Card.Text>
        </div>
        <Card.Text>
          {reviewObj.comment}
        </Card.Text>
        <div style={{ maxWidth: '18rem' }}>
          {buttonDisplay ? (
            <>
              <Link href={`/reviews/edit/${reviewObj.id}`} passHref>
                <Button className="review-buttons" variant="dark">Edit</Button>
              </Link><Button className="review-buttons" variant="dark" onClick={deleteThisReview}>Delete</Button>
            </>
          ) : '' }
        </div>
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
