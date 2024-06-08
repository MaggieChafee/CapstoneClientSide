/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createReview } from '../../api/reviewData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  rating: 0,
  comment: ' ',
};

function ReviewForm() {
  const [formInput, setFormInput] = useState(initialState);
  const [userRating, setUserRating] = useState(null);
  const [hover, setHover] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

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
    const payload = {
      comment: formInput.comment,
      rating: userRating,
      bookId: Number(id),
      userId: user.id,
      dateCreated: new Date(),
    };
    createReview(payload).then(() => router.push(`/books/${id}`));
  };
  return (
    <>
      <div>
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;
          return (
            <label key={index}>
              <input
                key={star}
                type="radio"
                name="rating"
                value={formInput.rating}
                onChange={() => setUserRating(currentRating)}
              />
              <span
                className="star"
                style={{
                  color:
                  currentRating <= (hover || userRating) ? '#ffc107' : '#e4e5e9',
                }}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              >
                {' '}★{' '}
              </span>
            </label>
          );
        })}
        <Form.Label htmlFor="inputPassword5">Review</Form.Label>
        <Form.Control
          type="text"
          name="comment"
          value={formInput.comment}
          aria-describedby="passwordHelpBlock"
          onChange={handleChange}
        />
        <Button onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
}

export default ReviewForm;
