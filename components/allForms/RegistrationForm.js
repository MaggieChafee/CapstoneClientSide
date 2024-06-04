/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import { createUser } from '../../api/userData';

const initialState = {
  username: '',
  email: '',
  imageUrl: '',
};

function RegistrationForm({ userObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (userObj.id) setFormInput(userObj);
  }, [userObj.id]);

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
    const payload = { ...formInput, uid: user.uid };
    createUser(payload).then(router.reload);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name="username" value={formInput.username} onChange={handleChange} placeholder="Choose a username." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" value={formInput.email} onChange={handleChange} placeholder="Email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Picture</Form.Label>
        <Form.Control type="test" name="imageUrl" value={formInput.imageUrl} onChange={handleChange} placeholder="Image Url" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}

RegistrationForm.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number,
    uid: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
};

RegistrationForm.defaultProps = {
  userObj: initialState,
};

export default RegistrationForm;
