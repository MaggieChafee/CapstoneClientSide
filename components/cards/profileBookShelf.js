import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

const initialState = {
  name: '',
  bookInformation: [],
};

function ProfileBookShelf({ bookShelfObj }) {
  return (
    <div height="400">
      <h1>{bookShelfObj.name}</h1>
      <div>
        {bookShelfObj.bookInformation.map((bookInfo) => (
          <Card key={bookInfo.bookId} style={{ width: '10rem' }}>
            <Card.Img variant="top" src={bookInfo.bookImage} />
            <Card.Body>
              <Card.Title>{bookInfo.bookTitle}</Card.Title>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
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
