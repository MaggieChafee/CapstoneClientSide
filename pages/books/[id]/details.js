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
import BookShelfButton from '../../../components/buttons/BookShelfButton';

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
    getReviewsByBookId(id).then(setBookReviews);
    getAverageRating(id).then(setBookRating);
  };

  useEffect(() => {
    getDetails();
  }, [id]);

  return (
    <>
      <div className="book-details-container">
        <div className="book-details-header-container">
          <div>
            <Image src={bookDetails.imageUrl} style={{ maxWidth: '18rem' }} />
          </div>
          <div className="book-details-header">
            <h1>{bookDetails.title}</h1>
            {bookDetails.authorInformation ? (
              <h3>
                By {bookDetails.authorInformation.map((a) => `${a.firstName} ${a.lastName}`).join(', ')}
              </h3>
            ) : (
              <p>Loading author information...</p>
            )}
            <div style={{ height: '20px' }} />
            <p>Release Date: {bookDetails.publicationDate}</p>
            <p>Page Count: {bookDetails.numberOfPages}</p>
            <p>{bookDetails.summary}</p>
            {checkShelf && shelfName ? (<BookShelfButton key={shelfName.id} className="book-shelf-button" shelfObj={shelfName} onUpdate={getDetails} />) : (<Link href={`../../books/${bookDetails.id}/shelf`} passHref><Button className="book-shelf-button">Add Book To Shelf</Button></Link>)}
          </div>
        </div>
      </div>
      <div style={{ height: '20px' }} />
      <div className="book-details-container">
        <h2>Average Rating: {bookRating === 0 ? ('No Ratings Yet') : (`${bookRating}/5`)}</h2>
        <div>
          {reviewCheck
            ? (<ReviewCard key={usersReview.id} reviewObj={usersReview} onUpdate={getDetails} />) : (<Link href={`/books/${id}/add-review`} passHref><Button className="sign-out-button" variant="dark">Leave a Review</Button></Link>)}
        </div>
        <div className="review-details-container">
          <h2>Reviews</h2>
          {bookReviews.map((review) => (
            <ReviewCard key={review.id} reviewObj={review} onUpdate={getDetails} />
          ))}
        </div>
        <div style={{ height: '25px' }} />
      </div>
    </>
  );
}

export default ViewSingleBook;
