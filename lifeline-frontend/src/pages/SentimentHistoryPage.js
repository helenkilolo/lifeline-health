import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SentimentHistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token Sent:', token); // Verify token is present
        const response = await axios.get('http://localhost:5000/api/sentiment/history', {
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

  // Add this useEffect to debug the updated `history` state
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
