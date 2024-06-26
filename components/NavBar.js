/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand><img src="/BiblioFile.png" alt="logo" width="125" height="125" /></Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="navbar">
            <div className="tabs">
              {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
              <Link passHref href="/">
                <Nav.Link>Home</Nav.Link>
              </Link>
              <Link passHref href="/books/all">
                <Nav.Link>Browse Books</Nav.Link>
              </Link>
              <Link passHref href="/books/recent-releases">
                <Nav.Link>Recent Releases</Nav.Link>
              </Link>
            </div>
            <div className="search-bar-div">
              <SearchBar />
            </div>
            <Button
              variant="dark"
              className="sign-out-button-2"
              onClick={signOut}
            >
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
