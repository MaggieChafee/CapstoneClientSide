/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import Link from 'next/link';
import { getAverageRating, getSingleBook } from '../../../api/bookData';
import { getReviewsByBookId, getSingleReviewForBook } from '../../../api/reviewData';
import { useAuth } from '../../../utils/context/authContext';
import ReviewCard from '../../../components/cards/userReviewCard';
import { shelfCheck } from '../../../api/shelfData';

function ViewSingleBook() {
  const [bookDetails, setBookDetails] = useState({});
  const [bookReviews, setBookReviews] = useState([]);
  const [bookRating, setBookRating] = useState(0);
  const [usersReview, setUsersReview] = useState({});
  const [reviewCheck, setReviewCheck] = useState(false);
  const [checkShelf, setCheckShelf] = useState(false);
  const [shelfName, setShelfName] = useState(null);

  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const getDetails = () => {
    getSingleBook(id).then(setBookDetails);
    const payload = {
      bookId: id,
      userId: user.id,
    };
    getSingleReviewForBook(payload).then((review) => {
      setUsersReview(review);
      if (Object.keys(review).length > 0) {
        setReviewCheck(true);
      } else {
        setReviewCheck(false);
      }
    });
    shelfCheck(payload).then((shelf) => {
      setShelfName(shelf);
      if (Object.keys(shelf).length > 0) {
        setCheckShelf(true);
      } else {
        setCheckShelf(false);
      }
    });
  };

  const reviews = () => {
    getReviewsByBookId(id).then(setBookReviews);
  };

  const rating = () => {
    getAverageRating(id).then(setBookRating);
  };

  useEffect(() => {
    getDetails();
    reviews();
    rating();
  }, [id]);

  return (
    <>
      <div className="page-container">
        <h1>{bookDetails.title}</h1>
        <Image src={bookDetails.imageUrl} />
        {bookDetails.authorInformation ? (
          <h4>
            By {bookDetails.authorInformation.map((a) => `${a.firstName} ${a.lastName}`).join(', ')}
          </h4>
        ) : (
          <p>Loading author information...</p>
        )}
        <h4>{bookDetails.publicationDate}</h4>
        <h4>{bookDetails.numberOfPages}</h4>
        <p>{bookDetails.sumary}</p>
        <Link href={`../../books/${bookDetails.id}/shelf`} passHref>
          <Button>{checkShelf && shelfName ? shelfName.name : 'Add Book To Shelf'}</Button>
        </Link>
      </div>
      <div>
        {reviewCheck
          ? (<ReviewCard key={usersReview.id} reviewObj={usersReview} onUpdate={getDetails} />) : (<Link href={`/books/${id}/add-review`} passHref><Button>Leave a Review</Button></Link>)}
      </div>
      <div>
        <h4>Avarage Rating: {bookRating === 0 ? (<h4>No Ratings Yet</h4>) : (bookRating)}</h4>
        <h2>Reviews</h2>
        {bookReviews.map((review) => (
          <ReviewCard key={review.id} reviewObj={review} />
        ))}
      </div>
    </>
  );
}

export default ViewSingleBook;
