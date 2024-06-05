import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getUserDetails = (userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((r) => r.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createUserAndShelves = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/users-and-shelves`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((r) => r.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getUserDetails, createUser, createUserAndShelves };
