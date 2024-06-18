/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { createReview, updateReview } from '../../api/reviewData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  comment: ' ',
};

function ReviewForm({ reviewObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [userRating, setUserRating] = useState(null);
  const [hover, setHover] = useState(null);

  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    if (reviewObj.id) {
      setFormInput(reviewObj);
      setUserRating(reviewObj.rating);
    }
  }, [reviewObj.id, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => (
      {
        ...prevState,
        [name]: value,
      }
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewObj.id) {
      const updatePayload = {
        reviewId: reviewObj.id,
        comment: formInput.comment,
        rating: userRating,
        dateCreated: new Date(),
      };
      updateReview(updatePayload).then(() => router.push(`/books/${reviewObj.bookId}/details`));
    } else {
      const payload = {
        comment: formInput.comment,
        rating: userRating,
        bookId: Number(id),
        userId: user.id,
        dateCreated: new Date(),
      };
      createReview(payload).then(() => router.push(`/books/${id}/details`));
    }
  };

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Label htmlFor="inputPassword5">Rating</Form.Label>
          <div>
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;
              return (
                <label key={index}>
                  <input
                    key={star}
                    type="radio"
                    name="rating"
                    value={userRating}
                    onChange={() => setUserRating(currentRating)}
                  />
                  <span
                    className="star"
                    style={{
                      color:
                  currentRating <= (hover || userRating) ? '#FF6230' : '#e4e5e9',
                    }}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                  >
                    ★
                  </span>
                </label>
              );
            })}
          </div>
          <Form.Label htmlFor="inputPassword5">Review</Form.Label>
          <Form.Control
            as="textarea"
            name="comment"
            value={formInput.comment}
            aria-describedby="passwordHelpBlock"
            onChange={handleChange}
          />
          <div style={{ height: '10px' }} />
          <Button className="sign-out-button" variant="dark" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

ReviewForm.propTypes = {
  reviewObj: PropTypes.shape({
    id: PropTypes.number,
    rating: PropTypes.number,
    comment: PropTypes.string,
    bookId: PropTypes.number,
  }),
};

ReviewForm.defaultProps = {
  reviewObj: initialState,
};

export default ReviewForm;
