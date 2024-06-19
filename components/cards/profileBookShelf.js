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
    <div className="profile-bookshelf-card" style={{ height: '400px' }}>
      <div className="profile-bookshelf-header">
        <h3>{bookShelfObj.name}</h3>
        <div style={{ width: '10px' }} />
        <Link href={`/shelves/${bookShelfObj.id}`} passHref>
          <Button className="profile-bookshelf-button" variant="dark">Show More</Button>
        </Link>
      </div>
      <hr style={{
        width: '100%', height: '3px', border: 'none',
      }}
      />
      <div className="profile-bookshelf-books" style={{ width: '825px' }}>
        {bookShelfObj.bookInformation.map((bookInfo) => (
          <div key={bookInfo.bookId} className="profile-book-container">
            <Link href={`/books/${bookInfo.bookId}/details`} passHref>
              <Image className="profile-book-image" src={bookInfo.bookImage} style={{ maxHeight: '15rem', maxWidth: '10rem' }} />
            </Link>
            <p className="profile-book-title">{bookInfo.bookTitle}</p>
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
