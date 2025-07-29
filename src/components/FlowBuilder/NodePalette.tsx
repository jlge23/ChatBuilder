import React from 'react';
import { 
  MessageCircle, 
  Bot, 
  Phone, 
  FileText, 
  Image, 
  Video, 
  MapPin, 
  ShoppingCart,
  UserCheck,
  GitBranch,
  Clock,
  Send
} from 'lucide-react';

const nodeCategories = [
  {
    title: 'Mensajes',
    nodes: [
      { id: 'text', icon: MessageCircle, label: 'Mensaje de Texto', color: 'blue' },
      { id: 'template', icon: FileText, label: 'Plantilla', color: 'purple' },
      { id: 'image', icon: Image, label: 'Imagen', color: 'green' },
      { id: 'video', icon: Video, label: 'Video', color: 'red' },
      { id: 'audio', icon: Phone, label: 'Audio', color: 'yellow' },
      { id: 'document', icon: FileText, label: 'Documento', color: 'orange' },
      { id: 'location', icon: MapPin, label: 'Ubicación', color: 'teal' }
    ]
  },
  {
    title: 'Interactivos',
    nodes: [
      { id: 'quick_reply', icon: Send, label: 'Respuesta Rápida', color: 'indigo' },
      { id: 'list', icon: ShoppingCart, label: 'Lista', color: 'pink' },
      { id: 'button', icon: UserCheck, label: 'Botones', color: 'cyan' }
    ]
  },
  {
    title: 'Lógica',
    nodes: [
      { id: 'condition', icon: GitBranch, label: 'Condición', color: 'gray' },
      { id: 'ai_response', icon: Bot, label: 'Respuesta IA', color: 'emerald' },
      { id: 'delay', icon: Clock, label: 'Espera', color: 'amber' }
    ]
  }
];

const colorClasses = {
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  yellow: 'bg-yellow-500',
  orange: 'bg-orange-500',
  teal: 'bg-teal-500',
  indigo: 'bg-indigo-500',
  pink: 'bg-pink-500',
  cyan: 'bg-cyan-500',
  gray: 'bg-gray-500',
  emerald: 'bg-emerald-500',
  amber: 'bg-amber-500'
};

export default function NodePalette() {
  const handleDragStart = (e: React.DragEvent, nodeType: string) => {
    e.dataTransfer.setData('nodeType', nodeType);
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Componentes</h3>
      
      {nodeCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-8">
          <h4 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">
            {category.title}
          </h4>
          
          <div className="space-y-2">
            {category.nodes.map((node) => {
              const Icon = node.icon;
              return (
                <div
                  key={node.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, node.id)}
                  className="flex items-center p-3 bg-gray-700 rounded-lg cursor-move hover:bg-gray-600 transition-colors"
                >
                  <div className={`p-2 rounded-md ${colorClasses[node.color as keyof typeof colorClasses]} mr-3`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-200 text-sm">{node.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="mt-8 p-4 bg-gray-700 rounded-lg">
        <h4 className="text-white font-medium mb-2">Configuración WhatsApp</h4>
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex justify-between">
            <span>Webhook URL:</span>
            <span className="text-green-400">✓</span>
          </div>
          <div className="flex justify-between">
            <span>Token:</span>
            <span className="text-green-400">✓</span>
          </div>
          <div className="flex justify-between">
            <span>Verify Token:</span>
            <span className="text-green-400">✓</span>
          </div>
        </div>
      </div>
    </div>
  );
}