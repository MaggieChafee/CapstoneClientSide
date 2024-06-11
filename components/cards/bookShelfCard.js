// import Link from 'next/link';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { addBookToShelf } from '../../api/shelfData';

function BookShelfCard({ shelfObj }) {
  const router = useRouter();
  const { id } = router.query;

  const handleClick = () => {
    const payload = {
      bookId: id,
      shelfId: shelfObj.id,
    };
    addBookToShelf(payload).then(() => router.push(`/books/${id}/details`));
  };

  return (
    <Card>
      <h1>{shelfObj.name}</h1>
      <Button onClick={handleClick}>+</Button>
    </Card>
  );
}

BookShelfCard.propTypes = {
  shelfObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
};

export default BookShelfCard;
