/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { getSingleBook } from '../../api/bookData';
import { getReviewsByBookId } from '../../api/reviewData';
import ReviewCard from '../../components/cards/userReviewCard';

function ViewSingleBook() {
  const [bookDetails, setBookDetails] = useState({});
  const [bookReviews, setBookReviews] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const getDetails = () => {
    getSingleBook(id).then(setBookDetails);
  };

  const reviews = () => {
    getReviewsByBookId(id).then(setBookReviews);
  };

  useEffect(() => {
    getDetails(id);
    reviews(id);
  }, []);

  return (
    <>
      <div className="page-container">
        <h1>{bookDetails.title}</h1>
        <Image src={bookDetails.imageUrl} />
        <h4>By {bookDetails.authorInformation.map((a) => a.firstName)} {bookDetails.authorInformation.map((a) => a.lastName)}</h4>
        <h4>{bookDetails.publicationDate}</h4>
        <h4>{bookDetails.numberOfPages}</h4>
        <p>{bookDetails.sumary}</p>
        <Button>
          Shelf Shit
        </Button>
      </div>
      <div>
        <h2>Reviews</h2>
        {bookReviews.map((review) => (
          <ReviewCard key={review.id} reviewObj={review} />
        ))}
      </div>
    </>
  );
}

export default ViewSingleBook;

/*
{
  "id": 1,
  "authorInformation": [
    {
      "id": 1,
      "firstName": "E.M.",
      "lastName": "Forster"
    }
  ]
}
*/
