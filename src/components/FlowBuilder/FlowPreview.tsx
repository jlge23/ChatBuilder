import React, { useState } from 'react';
import { X, Send, Bot, User } from 'lucide-react';

interface FlowPreviewProps {
  onClose: () => void;
}

const mockConversation = [
  { type: 'bot', message: '¡Hola! Bienvenido a nuestro servicio de atención al cliente. ¿En qué puedo ayudarte hoy?', time: '10:30' },
  { type: 'user', message: 'Hola, tengo una pregunta sobre mi pedido', time: '10:31' },
  { type: 'bot', message: 'Por supuesto, estaré encantado de ayudarte con tu pedido. ¿Podrías proporcionarme tu número de pedido?', time: '10:31' },
  { type: 'user', message: 'Es el #12345', time: '10:32' },
  { type: 'bot', message: 'He encontrado tu pedido #12345. Veo que fue realizado hace 2 días y actualmente está en proceso de envío. ¿Hay algo específico que te preocupa?', time: '10:32' }
];

export default function FlowPreview({ onClose }: FlowPreviewProps) {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState(mockConversation);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      type: 'user' as const,
      message: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversation(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        type: 'bot' as const,
        message: 'Gracias por tu mensaje. Un agente se pondrá en contacto contigo pronto.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setConversation(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-white font-medium">Vista Previa del Bot</h3>
            <p className="text-gray-400 text-sm">Prueba tu flujo aquí</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* WhatsApp Header Simulation */}
      <div className="bg-green-600 p-3 flex items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
          <Bot className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <h4 className="text-white font-medium">Atención al Cliente</h4>
          <p className="text-green-100 text-sm">En línea</p>
        </div>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100 space-y-4">
        {conversation.map((msg, index) => (
          <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              msg.type === 'user' 
                ? 'bg-green-500 text-white' 
                : 'bg-white text-gray-800 shadow-md'
            }`}>
              <p className="text-sm">{msg.message}</p>
              <p className={`text-xs mt-1 ${
                msg.type === 'user' ? 'text-green-100' : 'text-gray-500'
              }`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-gray-200 border-t">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Escribe un mensaje..."
            className="flex-1 px-4 py-2 bg-white rounded-full border focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}