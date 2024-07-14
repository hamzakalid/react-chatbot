import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import './style.css';

const ChatComponent = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello, How Can I help you?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    // Add user message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: 'user' },
    ]);

    // Send message to API and get response
    const response = await fetch(
      'https://8ef9-37-99-155-2.ngrok-free.app/chat',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      }
    );
    const data = await response.json();

    // Add bot response to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: data.reply, sender: 'bot' },
    ]);

    // Clear the input field
    setInput('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="card mt-5 w-100">
        <div className="d-flex flex-row justify-content-between p-3 adiv text-white">
          <FontAwesomeIcon icon={faChevronLeft} />
          <span className="pb-3">Nawras HR</span>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <div className="body flex-grow-1 overflow-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`d-flex flex-row p-3 ${
                message.sender === 'user'
                  ? 'justify-content-end user-message'
                  : ''
              }`}
            >
              {message.sender === 'bot' && (
                <img
                  src="https://img.icons8.com/color/48/000000/firebase-ml.png"
                  width="30"
                  height="30"
                  alt="Bot"
                />
              )}
              <div
                className={`chat ml-2 p-3 ${
                  message.sender === 'user' ? 'bg-white mr-2' : ''
                }`}
              >
                <span className="text-muted">{message.text}</span>
              </div>
              {message.sender === 'user' && (
                <img
                  src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png"
                  width="30"
                  height="30"
                  alt="User"
                />
              )}
            </div>
          ))}
        </div>
        <div className="form-group px-3 mb-3">
          <textarea
            className="form-control"
            rows="1"
            placeholder="Type your message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
