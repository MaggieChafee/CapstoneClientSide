/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { checkUser, signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getUserDetails } from '../api/userData';
import RegistrationForm from '../components/allForms/RegistrationForm';

function Home() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [userDetails, setUserDetails] = useState({});
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

  useEffect(() => {
    userStatus();
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
          <p>Click the button below to logout!</p>
          <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      )}

    </>

  );
}

export default Home;
