import { useState, useEffect } from 'react';
import styled from 'styled-components';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const ChatButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 350px;
  height: 500px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background-color: #007bff;
  color: white;
  padding: 15px;
  font-weight: bold;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 15px;
`;

const ChatInput = styled.div`
  padding: 15px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  max-width: 80%;
  line-height: 1.5;
  white-space: pre-line;
  ${props => props.$isUser ? `
    background-color: #007bff;
    color: white;
    margin-left: auto;
  ` : `
    background-color: #f0f0f0;
    margin-right: auto;
  `}
`;

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [meetPrompted, setMeetPrompted] = useState(false);

  const handleSend = async (message) => {
    if (!message.trim()) return;

    setMessages(prev => [...prev, { id: Date.now(), text: message, sender: 'user' }]);
    setInput('');

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message, sessionId: 'user123' })
      });
      if (!response.ok) throw new Error(`Status ${response.status}`);

      const { reply } = await response.json();
      setMessages(prev => [...prev, { id: Date.now() + 1, text: reply, sender: 'bot' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "Sorry, I'm having trouble connecting.", sender: 'bot' }]);
    }
  };

  useEffect(() => {
    const botCount = messages.filter(m => m.sender === 'bot').length;
    if (botCount >= 2 && !meetPrompted) {
      setMessages(prev => [...prev, {
        id: Date.now() + 2,
        text: 'For further assistance, schedule a meet ',
        sender: 'bot',
        linkText: 'here',
        url: 'https://www.thekayee.com/expert-assistance'
      }]);
      setMeetPrompted(true);
    }
  }, [messages, meetPrompted]);

  return (
    <ChatContainer>
      {isOpen && (
        <ChatWindow>
          <ChatHeader>Chat with us</ChatHeader>
          <ChatMessages>
            {messages.map(msg => (
              <Message key={msg.id} $isUser={msg.sender === 'user'}>
                {msg.url ? (
                  <span>
                    {msg.text}
                    <a href={msg.url} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline', marginLeft: '4px' }}
>{msg.linkText}</a>
                  </span>
                ) : (
                  msg.text
                )}
              </Message>
            ))}
          </ChatMessages>
          <ChatInput>
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={e => e.key === 'Enter' && handleSend(input)}
            />
            <SendButton onClick={() => handleSend(input)}>Send</SendButton>
          </ChatInput>
        </ChatWindow>
      )}
      <ChatButton onClick={() => setIsOpen(o => !o)}>
        {isOpen ? '×' : '💬'}
      </ChatButton>
    </ChatContainer>
  );
}

export default Chatbot;
