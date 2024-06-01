import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getUsersShelves = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/shelves/user/${userId}`, {
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

const createShelf = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/shelves`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((r) => r.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleShelf = (shelfId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/shelves/${shelfId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json)
    .then((data) => resolve(data))
    .catch(reject);
});

const addBookToShelf = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bookshelves`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((r) => r.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateShelfBookIsOn = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bookshelves/${payload.bookShelfId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteBookFromShelf = (bookShelfId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bookshelves/${bookShelfId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getUsersShelves, createShelf, getSingleShelf, addBookToShelf, updateShelfBookIsOn, deleteBookFromShelf,
};
