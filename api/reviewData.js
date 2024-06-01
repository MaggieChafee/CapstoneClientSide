import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getReviewsByBookId = (bookId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/${bookId}/reviews`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleReviewForBook = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/${payload.bookId}/userReview/${payload.userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getUsersReviews = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviews/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createReview = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((r) => r.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateReview = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviews/${payload.reviewId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteReview = (reviewId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getReviewsByBookId, getSingleReviewForBook, getUsersReviews, createReview, updateReview, deleteReview,
};
