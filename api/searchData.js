import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const searchBook = (query) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/books/search/${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        resolve([]);
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

export default searchBook;
