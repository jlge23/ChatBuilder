import React, { useState } from 'react';
import { Plus, Edit, Trash2, Copy, MessageCircle } from 'lucide-react';

const templates = [
  {
    id: 1,
    name: 'Bienvenida',
    category: 'Saludo',
    language: 'es',
    status: 'approved',
    content: '¡Hola {{1}}! Bienvenido a {{2}}. ¿En qué podemos ayudarte hoy?',
    variables: ['nombre', 'empresa'],
    lastModified: '2024-01-15'
  },
  {
    id: 2,
    name: 'Confirmación de Pedido',
    category: 'Transaccional',
    language: 'es',
    status: 'approved',
    content: 'Tu pedido #{{1}} ha sido confirmado. El total es {{2}}. Tiempo estimado de entrega: {{3}}.',
    variables: ['numero_pedido', 'total', 'tiempo_entrega'],
    lastModified: '2024-01-14'
  },
  {
    id: 3,
    name: 'Soporte Técnico',
    category: 'Atención al Cliente',
    language: 'es',
    status: 'pending',
    content: 'Hemos recibido tu consulta técnica. Un especialista se pondrá en contacto contigo en las próximas {{1}} horas.',
    variables: ['tiempo_respuesta'],
    lastModified: '2024-01-13'
  }
];

const categories = ['Todos', 'Saludo', 'Transaccional', 'Atención al Cliente', 'Marketing'];
const statusColors = {
  approved: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  rejected: 'bg-red-100 text-red-800'
};

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showModal, setShowModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);

  const filteredTemplates = templates.filter(template => 
    selectedCategory === 'Todos' || template.category === selectedCategory
  );

  const handleEdit = (template: any) => {
    setEditingTemplate(template);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta plantilla?')) {
      console.log('Eliminando plantilla', id);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Plantillas de Mensajes</h1>
            <p className="text-gray-400">Gestiona las plantillas de WhatsApp Business</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Plantilla
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold text-lg">{template.name}</h3>
                <p className="text-gray-400 text-sm">{template.category}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${statusColors[template.status as keyof typeof statusColors]}`}>
                {template.status}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-gray-300 text-sm mb-2">Contenido:</p>
              <div className="bg-gray-700 rounded p-3">
                <p className="text-gray-200 text-sm">{template.content}</p>
              </div>
            </div>

            {template.variables.length > 0 && (
              <div className="mb-4">
                <p className="text-gray-400 text-xs mb-2">Variables:</p>
                <div className="flex flex-wrap gap-1">
                  {template.variables.map((variable, index) => (
                    <span key={index} className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      {variable}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
              <span>Idioma: {template.language}</span>
              <span>Modificado: {template.lastModified}</span>
            </div>

            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handleEdit(template)}
                className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                <Edit className="w-3 h-3 mr-1" />
                Editar
              </button>
              <button className="p-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors">
                <Copy className="w-3 h-3" />
              </button>
              <button 
                onClick={() => handleDelete(template.id)}
                className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-400 mb-2">
            No hay plantillas en esta categoría
          </h3>
          <p className="text-gray-500 mb-4">
            Crea tu primera plantilla para comenzar
          </p>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nueva Plantilla
          </button>
        </div>
      )}
    </div>
  );
}