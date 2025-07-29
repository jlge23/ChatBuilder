import React, { useState } from 'react';
import { Search, Filter, MessageCircle, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import ConversationList from '../components/Conversations/ConversationList';
import ChatView from '../components/Conversations/ChatView';

export default function Conversations() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const conversations = [
    {
      id: 1,
      customer: { name: 'María González', phone: '+34 600 123 456', avatar: 'MG' },
      lastMessage: '¿Cuál es el estado de mi pedido #12345?',
      timestamp: '2 min',
      status: 'active',
      unread: 2,
      tags: ['pedido', 'urgente']
    },
    {
      id: 2,
      customer: { name: 'Carlos López', phone: '+34 600 234 567', avatar: 'CL' },
      lastMessage: 'Necesito ayuda con la facturación',
      timestamp: '15 min',
      status: 'waiting',
      unread: 1,
      tags: ['facturación']
    },
    {
      id: 3,
      customer: { name: 'Ana Martín', phone: '+34 600 345 678', avatar: 'AM' },
      lastMessage: 'Gracias por la información',
      timestamp: '1h',
      status: 'resolved',
      unread: 0,
      tags: ['resuelto']
    },
    {
      id: 4,
      customer: { name: 'Roberto Díaz', phone: '+34 600 456 789', avatar: 'RD' },
      lastMessage: '¿Tienen descuentos disponibles?',
      timestamp: '2h',
      status: 'active',
      unread: 1,
      tags: ['descuentos', 'venta']
    }
  ];

  const stats = [
    { icon: MessageCircle, label: 'Total', value: conversations.length, color: 'blue' },
    { icon: Clock, label: 'Pendientes', value: conversations.filter(c => c.status === 'waiting').length, color: 'yellow' },
    { icon: CheckCircle, label: 'Resueltas', value: conversations.filter(c => c.status === 'resolved').length, color: 'green' },
    { icon: AlertCircle, label: 'Activas', value: conversations.filter(c => c.status === 'active').length, color: 'red' }
  ];

  const filteredConversations = conversations.filter(conv => {
    const matchesFilter = filter === 'all' || conv.status === filter;
    const matchesSearch = conv.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Conversaciones</h1>
            <p className="text-gray-400">Gestiona todas las conversaciones de WhatsApp</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center">
                  <Icon className={`w-5 h-5 mr-2 text-${stat.color}-400`} />
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-white font-semibold text-lg">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar conversaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="all">Todas</option>
            <option value="active">Activas</option>
            <option value="waiting">Pendientes</option>
            <option value="resolved">Resueltas</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="w-1/3 border-r border-gray-700">
          <ConversationList
            conversations={filteredConversations}
            selectedId={selectedConversation?.id}
            onSelect={setSelectedConversation}
          />
        </div>
        
        <div className="flex-1">
          {selectedConversation ? (
            <ChatView conversation={selectedConversation} />
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-900">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-400 mb-2">
                  Selecciona una conversación
                </h3>
                <p className="text-gray-500">
                  Elige una conversación para ver los mensajes
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}