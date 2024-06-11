/* eslint-disable react-hooks/exhaustive-deps */
import { Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getUserDetails } from '../api/userData';
import RegistrationForm from '../components/allForms/RegistrationForm';
import { getUsersShelves } from '../api/shelfData';
import ProfileBookShelf from '../components/cards/profileBookShelf';
import { getUsersReviews } from '../api/reviewData';
import ReviewCard from '../components/cards/userReviewCard';

function Home() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [userShelves, setUserShelves] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const { user } = useAuth();

  const getPageDetails = () => {
    checkUser(user.uid).then((r) => {
      if (r.id) {
        setIsRegistered(true);
        getUserDetails(user.id).then(setUserDetails);
      } else {
        setIsRegistered(false);
      }
    });

    getUsersShelves(user.id).then(setUserShelves);
    getUsersReviews(user.id).then(setUserReviews);
  };

  useEffect(() => {
    getPageDetails();
  }, [user]);

  return (
    <>
      {isRegistered === false ? (<><RegistrationForm /></>) : (
        <div
          className="page-container"
        >
          <div>
            <Image src={userDetails.imageUrl} alt="profile picture" />
          </div>
          <h1>Hello {userDetails.username}! </h1>
          <p>Contact Info: {userDetails.email}</p>
          <div>
            {userShelves.map((shelf) => (
              <ProfileBookShelf key={shelf.id} bookShelfObj={shelf} />
            ))}
          </div>
          <div>
            {userReviews.map((review) => (
              <ReviewCard key={review.id} reviewObj={review} onUpdate={getPageDetails} />
            ))}
          </div>
        </div>
      )}

    </>

  );
}

export default Home;
