/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="sign-in-container">
      <img className="sign-in-left" src="/BiblioFile.png" alt="logo" />
      <div className="sign-in-right">
        <h1>Welcome to BiblioFile</h1>
        <h4 style={{ fontStyle: 'italic' }}>A place to find your new favorite book.</h4>
        <p>Click the button below to login/signup.</p>
        <Button type="button" size="lg" className="sign-out-button" variant="dark" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Signin;
