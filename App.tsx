import React, { useState, useEffect, useRef } from 'react';
import { generateResponse, generateImageResponse, generateSearchResponse } from './utils/chatbot';
import { convertImageToBase64, fetchImageFromUrl } from './utils/imageUtils';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { TypingIndicator } from './components/TypingIndicator';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Welcome message
    const welcomeMessage: Message = {
      id: '1',
      text: "Hey there! If I say something weird… just pretend it's a feature, not a bug. Start typing—I'm ready when you are",
      isBot: true,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await generateResponse(text);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble responding right now. Please try again!",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendImage = async (text: string, imageData: string, imageType: 'upload' | 'url') => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: `${text} [Image ${imageType === 'upload' ? 'uploaded' : 'from URL'}]`,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      let base64: string;
      let mimeType: string;

      if (imageType === 'upload') {
        // imageData is already base64 from file upload
        const base64Match = imageData.match(/^data:([^;]+);base64,(.+)$/);
        if (base64Match) {
          mimeType = base64Match[1];
          base64 = base64Match[2];
        } else {
          throw new Error('Invalid image data format');
        }
      } else {
        // imageData is URL, fetch and convert
        const result = await fetchImageFromUrl(imageData);
        base64 = result.base64;
        mimeType = result.mimeType;
      }

      const response = await generateImageResponse(text, base64, mimeType);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I couldn't process that image. Please try again with a different image!",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendSearch = async (query: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: `🔍 Search: ${query}`,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await generateSearchResponse(query);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Search isn't working right now, but feel free to ask me anything directly!",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
      <ChatHeader />
      
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto px-4 py-6 min-h-0">
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isBot={message.isBot}
                timestamp={message.timestamp}
              />
            ))}
            
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <ChatInput 
            onSendMessage={handleSendMessage} 
            onSendImage={handleSendImage}
            onSendSearch={handleSendSearch}
            disabled={isTyping} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;