import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from 'react-bootstrap';
import Link from 'next/link';

const initialState = {
  name: '',
  bookInformation: [],
};

function ProfileBookShelf({ bookShelfObj }) {
  return (
    <div className="profile-bookshelf-card" style={{ height: '300px' }}>
      <div className="profile-bookshelf-header">
        <h3>{bookShelfObj.name}</h3>
        <Link href={`/shelves/${bookShelfObj.id}`} passHref>
          <Button className="profile-bookshelf-button" variant="dark">Show More</Button>
        </Link>
      </div>
      <hr style={{ width: '100%', size: '10' }} />
      <div className="profile-bookshelf-books" style={{ width: '660px' }}>
        {bookShelfObj.bookInformation.map((bookInfo) => (
          <div key={bookInfo.bookId}>
            <Image variant="top" src={bookInfo.bookImage} style={{ width: '10rem' }} />
            <p>{bookInfo.bookTitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

ProfileBookShelf.propTypes = {
  bookShelfObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    bookInformation: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        bookId: PropTypes.number,
        bookTitle: PropTypes.string,
        bookImage: PropTypes.string,
      }),
    ),
  }),
};

ProfileBookShelf.defaultProps = {
  bookShelfObj: initialState,
};

export default ProfileBookShelf;
