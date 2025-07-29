import React, { useState } from 'react';
import { Send, Phone, Video, MoreVertical, Bot, User } from 'lucide-react';

interface ChatViewProps {
  conversation: any;
}

const mockMessages = [
  {
    id: 1,
    type: 'received',
    content: 'Hola, tengo una pregunta sobre mi pedido',
    timestamp: '10:30',
    status: 'delivered'
  },
  {
    id: 2,
    type: 'sent',
    content: '¡Hola! Estaré encantado de ayudarte con tu pedido. ¿Podrías proporcionarme tu número de pedido?',
    timestamp: '10:31',
    status: 'read',
    isBot: true
  },
  {
    id: 3,
    type: 'received',
    content: 'Es el #12345',
    timestamp: '10:32',
    status: 'delivered'
  },
  {
    id: 4,
    type: 'sent',
    content: 'He encontrado tu pedido #12345. Veo que fue realizado hace 2 días y actualmente está en proceso de envío. Tu pedido llegará mañana entre las 9:00 y 18:00. ¿Hay algo más en lo que pueda ayudarte?',
    timestamp: '10:33',
    status: 'read',
    isBot: true
  },
  {
    id: 5,
    type: 'received',
    content: 'Perfecto, muchas gracias por la información',
    timestamp: '10:35',
    status: 'delivered'
  }
];

export default function ChatView({ conversation }: ChatViewProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'sent' as const,
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent' as const,
      isBot: false
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Chat Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium mr-3">
              {conversation.customer.avatar}
            </div>
            <div>
              <h3 className="text-white font-medium">{conversation.customer.name}</h3>
              <p className="text-gray-400 text-sm">{conversation.customer.phone}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
              <Phone className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
              <Video className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md ${
              msg.type === 'sent' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-100'
            } rounded-lg p-3`}>
              {msg.type === 'sent' && msg.isBot && (
                <div className="flex items-center mb-2 text-blue-200">
                  <Bot className="w-3 h-3 mr-1" />
                  <span className="text-xs">Bot</span>
                </div>
              )}
              
              <p className="text-sm">{msg.content}</p>
              
              <div className="flex items-center justify-between mt-2">
                <span className={`text-xs ${
                  msg.type === 'sent' ? 'text-blue-200' : 'text-gray-400'
                }`}>
                  {msg.timestamp}
                </span>
                
                {msg.type === 'sent' && (
                  <span className={`text-xs ${
                    msg.status === 'read' ? 'text-blue-200' : 'text-blue-300'
                  }`}>
                    {msg.status === 'read' ? '✓✓' : '✓'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-gray-800 border-t border-gray-700 p-4">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Escribe un mensaje..."
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
          <span>El bot responderá automáticamente cuando sea necesario</span>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
            <span>Ollama conectado</span>
          </div>
        </div>
      </div>
    </div>
  );
}