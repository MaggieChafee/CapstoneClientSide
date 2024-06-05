/* eslint-disable react-hooks/exhaustive-deps */
import { Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getUserDetails } from '../api/userData';
import RegistrationForm from '../components/allForms/RegistrationForm';
import { getUsersShelves } from '../api/shelfData';
import ProfileBookShelf from '../components/cards/profileBookShelf';

function Home() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [userShelves, setUserShelves] = useState([]);
  const { user } = useAuth();

  const userStatus = () => {
    checkUser(user.uid).then((r) => {
      if (r.id) {
        setIsRegistered(true);
        getUserDetails(user.id).then(setUserDetails);
      } else {
        setIsRegistered(false);
      }
    });
  };

  const bookShelves = () => {
    getUsersShelves(user.id).then(setUserShelves);
  };

  useEffect(() => {
    userStatus();
    bookShelves();
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
        </div>
      )}

    </>

  );
}

export default Home;
