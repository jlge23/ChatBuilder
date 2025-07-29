import React from 'react';
import { Clock, MessageCircle } from 'lucide-react';

interface Conversation {
  id: number;
  customer: { name: string; phone: string; avatar: string };
  lastMessage: string;
  timestamp: string;
  status: string;
  unread: number;
  tags: string[];
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: number;
  onSelect: (conversation: Conversation) => void;
}

const statusColors = {
  active: 'bg-green-500',
  waiting: 'bg-yellow-500',
  resolved: 'bg-gray-500'
};

const tagColors = [
  'bg-blue-100 text-blue-800',
  'bg-green-100 text-green-800',
  'bg-purple-100 text-purple-800',
  'bg-orange-100 text-orange-800'
];

export default function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
  return (
    <div className="h-full bg-gray-800 overflow-y-auto">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          onClick={() => onSelect(conversation)}
          className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors ${
            selectedId === conversation.id ? 'bg-gray-700 border-l-4 border-blue-500' : ''
          }`}
        >
          <div className="flex items-start">
            <div className="relative">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                {conversation.customer.avatar}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusColors[conversation.status as keyof typeof statusColors]} rounded-full border-2 border-gray-800`} />
            </div>
            
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium truncate">
                  {conversation.customer.name}
                </h4>
                <div className="flex items-center text-gray-400 text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {conversation.timestamp}
                </div>
              </div>
              
              <p className="text-gray-400 text-sm truncate mt-1">
                {conversation.lastMessage}
              </p>
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-wrap gap-1">
                  {conversation.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 text-xs rounded-full ${tagColors[index % tagColors.length]}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {conversation.unread > 0 && (
                  <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {conversation.unread}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {conversations.length === 0 && (
        <div className="p-8 text-center">
          <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-gray-400 font-medium mb-2">No hay conversaciones</h3>
          <p className="text-gray-500 text-sm">
            Las nuevas conversaciones aparecerán aquí
          </p>
        </div>
      )}
    </div>
  );
}