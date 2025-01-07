import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Avatar,
} from '@mui/material';
import { motion } from 'framer-motion';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { sender: 'user', text: input }]);
      setInput('');
      setLoading(true);

      try {
        const response = await axios.post('http://localhost:5000/api/chat', {
          message: input,
        });

        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: response.data.reply },
        ]);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: 'Sorry, I encountered an issue. Please try again.',
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        AI Mental Health Chat
      </Typography>
      <Box
        sx={{
          height: '60vh',
          overflowY: 'auto',
          marginBottom: 2,
          padding: 2,
          border: '1px solid #ddd',
          borderRadius: 1,
          backgroundColor: '#fafafa',
        }}
      >
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              margin: '5px 0',
            }}
          >
            {msg.sender === 'bot' && (
              <Avatar
                src="/bot-avatar.png"
                alt="Bot"
                sx={{ marginRight: 1, width: 40, height: 40 }}
              />
            )}
            <Typography
              sx={{
                padding: 1,
                margin: '5px 0',
                borderRadius: 1,
                maxWidth: '70%',
                wordWrap: 'break-word',
                backgroundColor: msg.sender === 'user' ? '#e0f7fa' : '#f1f8e9',
              }}
            >
              {msg.text}
            </Typography>
            {msg.sender === 'user' && (
              <Avatar
                src="/user-avatar.png"
                alt="User"
                sx={{ marginLeft: 1, width: 40, height: 40 }}
              />
            )}
          </motion.div>
        ))}
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ marginTop: 10 }}
          >
            <Typography align="left" sx={{ fontStyle: 'italic' }}>
              <CircularProgress size={20} /> Typing...
            </Typography>
          </motion.div>
        )}
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
          disabled={loading}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatPage;



