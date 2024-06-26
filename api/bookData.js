import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllBooks = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getRecentReleases = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/recent-releases`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleBook = (bookId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/${bookId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getAverageRating = (bookId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/${bookId}/average-rating`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllBooks, getRecentReleases, getSingleBook, getAverageRating,
};
