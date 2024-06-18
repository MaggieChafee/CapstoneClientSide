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
        <div className="profile-page-container">
          <div className="profile-header">
            <div className="profile-header-left">
              <Image src={userDetails.imageUrl} alt="profile picture" className="profile-image" />
            </div>
            <div>
              <h1>Hello {userDetails.username}! </h1>
              <p>Contact Info: {userDetails.email}</p>
            </div>
          </div>
          <div style={{ height: '20px' }} />
          <div className="profile-cards">
            <div className="card-column-left">
              <h2>Recent Reviews</h2>
              {userReviews.map((review) => (
                <ReviewCard key={review.id} reviewObj={review} onUpdate={getPageDetails} />
              ))}
            </div>
            <div className="card-column-right">
              {userShelves.map((shelf) => (
                <ProfileBookShelf key={shelf.id} bookShelfObj={shelf} />
              ))}
            </div>
          </div>
        </div>
      )}

    </>

  );
}

export default Home;
