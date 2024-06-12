// import Link from 'next/link';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { addBookToShelf, getBookShelfUsingBookIdAndShelfId, updateShelfBookIsOn } from '../../api/shelfData';

function BookShelfCard({
  shelfObj, className, currentShelf, onUpdate,
}) {
  const router = useRouter();
  const { id } = router.query;

  const handleClick = async () => {
    const getIdPayload = {
      bookId: Number(id),
      shelfId: currentShelf.id,
    };

    const fetchedBookShelf = await getBookShelfUsingBookIdAndShelfId(getIdPayload);

    if (fetchedBookShelf.id) {
      const payload = {
        bookShelfId: fetchedBookShelf.id,
        shelfId: shelfObj.id,
        bookId: Number(id),
      };
      await updateShelfBookIsOn(payload);
      onUpdate();
      router.push(`/books/${id}/details`);
    } else {
      const payload = {
        bookId: Number(id),
        shelfId: shelfObj.id,
      };
      await addBookToShelf(payload);
      router.push(`/books/${id}/details`);
    }
  };

  return (
    <Card className={className}>
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
  className: PropTypes.string,
  currentShelf: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

BookShelfCard.defaultProps = {
  className: '',
  currentShelf: {},
};

export default BookShelfCard;
