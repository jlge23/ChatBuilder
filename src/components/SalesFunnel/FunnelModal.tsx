import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface FunnelModalProps {
  isOpen: boolean;
  onClose: () => void;
  funnel?: any;
  onSave: (funnel: any) => void;
}

export default function FunnelModal({ isOpen, onClose, funnel, onSave }: FunnelModalProps) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    totalLeads: 0,
    totalRevenue: 0,
    conversionRate: 0,
    stages: []
  });

  useEffect(() => {
    if (funnel) {
      setFormData(funnel);
    } else {
      setFormData({
        id: Date.now().toString(),
        name: '',
        description: '',
        totalLeads: 0,
        totalRevenue: 0,
        conversionRate: 0,
        stages: []
      });
    }
  }, [funnel, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            {funnel ? 'Editar Embudo' : 'Nuevo Embudo'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Nombre del Embudo
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
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Leads Objetivo
              </label>
              <input
                type="number"
                value={formData.totalLeads}
                onChange={(e) => setFormData(prev => ({ ...prev, totalLeads: parseInt(e.target.value) || 0 }))}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Ingresos Objetivo
              </label>
              <input
                type="number"
                value={formData.totalRevenue}
                onChange={(e) => setFormData(prev => ({ ...prev, totalRevenue: parseInt(e.target.value) || 0 }))}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

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
              {funnel ? 'Actualizar' : 'Crear'} Embudo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}