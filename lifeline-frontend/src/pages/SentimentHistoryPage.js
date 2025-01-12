import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Set the base URL dynamically based on the environment
const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const SentimentHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token Sent:', token); // Debug token

        const response = await axios.get(`${BASE_URL}/api/sentiment/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('API Response:', response.data); // Debug API response
        setHistory(response.data);
      } catch (err) {
        console.error('Error Fetching History:', err.response?.data || err.message);
        setError('Failed to load sentiment history.');
      }
    };

    fetchHistory();
  }, []);

  // Debug updated `history` state
  useEffect(() => {
    console.log('History State:', history); // Debug history state
  }, [history]);

  return (
    <div>
      <h1>Sentiment History</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <ul>
          {history.map((item) => (
            <li key={item._id}>
              <strong>Text:</strong> {item.text} <br />
              <strong>Sentiment:</strong> {item.sentiment} <br />
              <strong>Date:</strong> {new Date(item.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SentimentHistoryPage;
