import React from 'react';
import { MessageCircle, User, Clock } from 'lucide-react';

const conversations = [
  {
    id: 1,
    user: 'María González',
    lastMessage: '¿Cuál es el estado de mi pedido?',
    time: '2 min',
    status: 'active',
    avatar: 'MG'
  },
  {
    id: 2,
    user: 'Carlos López',
    lastMessage: 'Necesito ayuda con la facturación',
    time: '5 min',
    status: 'waiting',
    avatar: 'CL'
  },
  {
    id: 3,
    user: 'Ana Martín',
    lastMessage: 'Gracias por la información',
    time: '12 min',
    status: 'resolved',
    avatar: 'AM'
  },
  {
    id: 4,
    user: 'Roberto Díaz',
    lastMessage: '¿Tienen descuentos disponibles?',
    time: '18 min',
    status: 'active',
    avatar: 'RD'
  }
];

const statusColors = {
  active: 'bg-green-500',
  waiting: 'bg-yellow-500',
  resolved: 'bg-gray-500'
};

export default function RecentConversations() {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Conversaciones Recientes</h3>
        <MessageCircle className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {conversations.map((conversation) => (
          <div 
            key={conversation.id}
            className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-650 transition-colors cursor-pointer"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                {conversation.avatar}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusColors[conversation.status as keyof typeof statusColors]} rounded-full border-2 border-gray-700`} />
            </div>
            
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium">{conversation.user}</h4>
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock className="w-3 h-3 mr-1" />
                  {conversation.time}
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-1 truncate">{conversation.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-blue-400 hover:text-blue-300 transition-colors">
        Ver todas las conversaciones
      </button>
    </div>
  );
}