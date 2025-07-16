import React, { useState, useRef, useEffect } from 'react';
import '../css/LiveChatPanel.css';
import { 
  FiX, 
  FiSend, 
  FiPaperclip, 
  FiSmile, 
  FiPhone, 
  FiVideo,
  FiMoreVertical,
  FiClock
} from 'react-icons/fi';

function LiveChatPanel({ customer, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'customer',
      content: 'Hello, I have a question about my recent order.',
      timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      read: true
    },
    {
      id: 2,
      sender: 'agent',
      content: 'Hi! I\'d be happy to help you with your order. What specific question do you have?',
      timestamp: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
      read: true
    },
    {
      id: 3,
      sender: 'customer',
      content: 'I was wondering about the delivery schedule. Will it be the same time as usual?',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      read: true
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'agent',
        content: newMessage.trim(),
        timestamp: new Date(),
        read: false
      };
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Simulate customer typing after agent message
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          // Simulate customer response
          if (Math.random() > 0.5) {
            const responses = [
              'Thank you for the information!',
              'That sounds good to me.',
              'I appreciate your help.',
              'Perfect, thank you!',
              'Got it, thanks for clarifying.'
            ];
            const customerMessage = {
              id: messages.length + 2,
              sender: 'customer',
              content: responses[Math.floor(Math.random() * responses.length)],
              timestamp: new Date(),
              read: false
            };
            setMessages(prev => [...prev, customerMessage]);
          }
        }, 2000);
      }, 1000);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const quickReplies = [
    'Thank you for your message!',
    'I\'ll check on that for you.',
    'Is there anything else I can help with?',
    'Your order is being processed.',
    'I\'ll get back to you shortly.'
  ];

  return (
    <div className="live-chat-panel">
      <div className="chat-header">
        <div className="customer-info">
          <div className="customer-avatar">
            {customer.name.charAt(0)}
          </div>
          <div className="customer-details">
            <h4>{customer.name}</h4>
            <span className="status online">Online</span>
          </div>
        </div>
        
        <div className="chat-actions">
          <button className="icon-btn" title="Voice call">
            <FiPhone />
          </button>
          <button className="icon-btn" title="Video call">
            <FiVideo />
          </button>
          <button className="icon-btn" title="More options">
            <FiMoreVertical />
          </button>
          <button className="icon-btn close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => {
          const showDate = index === 0 || 
            formatDate(messages[index - 1].timestamp) !== formatDate(message.timestamp);
          
          return (
            <div key={message.id}>
              {showDate && (
                <div className="date-separator">
                  <span>{formatDate(message.timestamp)}</span>
                </div>
              )}
              
              <div className={`message ${message.sender}`}>
                <div className="message-content">
                  <div className="message-text">
                    {message.content}
                  </div>
                  <div className="message-meta">
                    <span className="message-time">
                      <FiClock /> {formatTime(message.timestamp)}
                    </span>
                    {message.sender === 'agent' && (
                      <span className={`message-status ${message.read ? 'read' : 'sent'}`}>
                        {message.read ? '✓✓' : '✓'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {isTyping && (
          <div className="message customer">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="quick-replies">
        {quickReplies.map((reply, index) => (
          <button
            key={index}
            className="quick-reply-btn"
            onClick={() => setNewMessage(reply)}
          >
            {reply}
          </button>
        ))}
      </div>

      <form className="chat-input-form" onSubmit={handleSendMessage}>
        <div className="chat-input-container">
          <button type="button" className="icon-btn attach-btn">
            <FiPaperclip />
          </button>
          
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="chat-input"
            autoFocus
          />
          
          <button type="button" className="icon-btn emoji-btn">
            <FiSmile />
          </button>
          
          <button 
            type="submit" 
            className="send-btn"
            disabled={!newMessage.trim()}
          >
            <FiSend />
          </button>
        </div>
      </form>
    </div>
  );
}

export default LiveChatPanel;