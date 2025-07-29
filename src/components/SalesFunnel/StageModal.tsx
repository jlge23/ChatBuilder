import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface StageModalProps {
  isOpen: boolean;
  onClose: () => void;
  stage?: any;
  onSave: (stage: any) => void;
}

const stageColors = [
  { name: 'Azul', value: 'bg-blue-500' },
  { name: 'Verde', value: 'bg-green-500' },
  { name: 'Amarillo', value: 'bg-yellow-500' },
  { name: 'Púrpura', value: 'bg-purple-500' },
  { name: 'Índigo', value: 'bg-indigo-500' },
  { name: 'Rosa', value: 'bg-pink-500' },
  { name: 'Rojo', value: 'bg-red-500' },
  { name: 'Naranja', value: 'bg-orange-500' }
];

const automationTemplates = [
  'Mensaje de bienvenida',
  'Catálogo de productos',
  'Información detallada',
  'Descuentos personalizados',
  'Testimonios de clientes',
  'Comparativas de productos',
  'Garantías y políticas',
  'Proceso de pago',
  'Confirmación de compra',
  'Seguimiento post-venta',
  'Ofertas exclusivas',
  'Recordatorio de carrito abandonado'
];

const conditionTemplates = [
  'Primera interacción',
  'Consulta sobre productos',
  'Pregunta por precios',
  'Solicita más información',
  'Compara productos',
  'Pregunta por garantía',
  'Solicita comprar',
  'Proporciona datos de contacto',
  'Compra completada',
  'Feedback positivo',
  'Abandona el proceso',
  'Solicita soporte'
];

export default function StageModal({ isOpen, onClose, stage, onSave }: StageModalProps) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    color: 'bg-blue-500',
    automations: [''],
    conditions: [''],
    conversionRate: 0,
    leads: 0
  });

  useEffect(() => {
    if (stage) {
      setFormData(stage);
    } else {
      setFormData({
        id: Date.now().toString(),
        name: '',
        description: '',
        color: 'bg-blue-500',
        automations: [''],
        conditions: [''],
        conversionRate: 0,
        leads: 0
      });
    }
  }, [stage, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedData = {
      ...formData,
      automations: formData.automations.filter(a => a.trim() !== ''),
      conditions: formData.conditions.filter(c => c.trim() !== '')
    };
    onSave(cleanedData);
    onClose();
  };

  const addAutomation = () => {
    setFormData(prev => ({
      ...prev,
      automations: [...prev.automations, '']
    }));
  };

  const removeAutomation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      automations: prev.automations.filter((_, i) => i !== index)
    }));
  };

  const updateAutomation = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      automations: prev.automations.map((a, i) => i === index ? value : a)
    }));
  };

  const addCondition = () => {
    setFormData(prev => ({
      ...prev,
      conditions: [...prev.conditions, '']
    }));
  };

  const removeCondition = (index: number) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index)
    }));
  };

  const updateCondition = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      conditions: prev.conditions.map((c, i) => i === index ? value : c)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            {stage ? 'Editar Etapa' : 'Nueva Etapa'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Nombre de la Etapa
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Color
              </label>
              <select
                value={formData.color}
                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {stageColors.map((color) => (
                  <option key={color.value} value={color.value}>
                    {color.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Automations */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-gray-300 text-sm font-medium">
                Automatizaciones
              </label>
              <button
                type="button"
                onClick={addAutomation}
                className="flex items-center px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                <Plus className="w-3 h-3 mr-1" />
                Agregar
              </button>
            </div>
            <div className="space-y-2">
              {formData.automations.map((automation, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <select
                    value={automation}
                    onChange={(e) => updateAutomation(index, e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-700 text-white rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">Seleccionar automatización...</option>
                    {automationTemplates.map((template) => (
                      <option key={template} value={template}>
                        {template}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeAutomation(index)}
                    className="p-2 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Conditions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-gray-300 text-sm font-medium">
                Condiciones de Avance
              </label>
              <button
                type="button"
                onClick={addCondition}
                className="flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                <Plus className="w-3 h-3 mr-1" />
                Agregar
              </button>
            </div>
            <div className="space-y-2">
              {formData.conditions.map((condition, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <select
                    value={condition}
                    onChange={(e) => updateCondition(index, e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-700 text-white rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">Seleccionar condición...</option>
                    {conditionTemplates.map((template) => (
                      <option key={template} value={template}>
                        {template}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => removeCondition(index)}
                    className="p-2 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Tasa de Conversión (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.conversionRate}
                onChange={(e) => setFormData(prev => ({ ...prev, conversionRate: parseFloat(e.target.value) || 0 }))}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Número de Leads
              </label>
              <input
                type="number"
                value={formData.leads}
                onChange={(e) => setFormData(prev => ({ ...prev, leads: parseInt(e.target.value) || 0 }))}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {stage ? 'Actualizar' : 'Crear'} Etapa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}