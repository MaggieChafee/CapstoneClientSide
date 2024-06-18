import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReviewForm from '../../../components/allForms/ReviewForm';
import { getSingleReview } from '../../../api/reviewData';

function EditReview() {
  const [editReview, setEditReview] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleReview(id).then(setEditReview);
  }, [id]);

  return (
    <>
      <div className="review-form-container">
        <h1>Edit Review</h1>
        <ReviewForm reviewObj={editReview} />
      </div>
    </>
  );
}

export default EditReview;
