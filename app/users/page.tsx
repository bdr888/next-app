'use client';
import { useState } from 'react';

export default function Users() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [newUser, setNewUser] = useState(null);
  async function handleSubmit() {
    const url = 'https://jsonplaceholder.typicode.com/users';

    try {
      setLoading(true);
      setError('');

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: fullName, email, phone }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setLoading(false);
      setSuccess(true);
      setNewUser(data);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="app">
      {success ? (
        <div>Successfully signed up: {newUser?.name}</div>
      ) : (
        <form
          onSubmit={(e) => {
            handleSubmit();
            e.preventDefault();
          }}
        >
          <label htmlFor="fullName">Name: </label>
          <input
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            id="fullName"
            value={fullName}
          />
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              value={email}
            />
            <label htmlFor="phone">Phone: </label>
            <input
              type="tel"
              onChange={(e) => setPhone(e.target.value)}
              id="phone"
              value={phone}
            />
          </div>
          <button type="submit">{loading ? 'Loading' : 'Submit'}</button>
        </form>
      )}
      {error && <div>{error}</div>}
    </div>
  );
}
