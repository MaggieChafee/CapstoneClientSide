import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput !== '') router.push(`/search/${searchInput}`);
    setSearchInput('');
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control className="search-bar" type="text" value={searchInput} onChange={handleChange} />
    </Form>
  );
}
