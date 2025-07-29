import React, { useState } from 'react';
import { Plus, Edit, Trash2, TrendingUp, Users, DollarSign, Target, ArrowRight, Settings, Save } from 'lucide-react';

interface FunnelStage {
  id: string;
  name: string;
  description: string;
  color: string;
  automations: string[];
  conditions: string[];
  conversionRate: number;
  leads: number;
}

interface SalesFunnelData {
  id: string;
  name: string;
  description: string;
  stages: FunnelStage[];
  totalLeads: number;
  totalRevenue: number;
  conversionRate: number;
}

const defaultFunnels: SalesFunnelData[] = [
  {
    id: '1',
    name: 'Embudo Principal E-commerce',
    description: 'Embudo de ventas para productos principales',
    totalLeads: 1247,
    totalRevenue: 45680,
    conversionRate: 12.3,
    stages: [
      {
        id: 'awareness',
        name: 'Conocimiento',
        description: 'Usuario conoce el producto',
        color: 'bg-blue-500',
        automations: ['Mensaje de bienvenida', 'Catálogo de productos'],
        conditions: ['Primera interacción', 'Consulta sobre productos'],
        conversionRate: 45.2,
        leads: 1247
      },
      {
        id: 'interest',
        name: 'Interés',
        description: 'Usuario muestra interés específico',
        color: 'bg-green-500',
        automations: ['Información detallada', 'Descuentos personalizados'],
        conditions: ['Pregunta por precios', 'Solicita más información'],
        conversionRate: 32.1,
        leads: 564
      },
      {
        id: 'consideration',
        name: 'Consideración',
        description: 'Usuario evalúa la compra',
        color: 'bg-yellow-500',
        automations: ['Testimonios', 'Comparativas', 'Garantías'],
        conditions: ['Compara productos', 'Pregunta por garantía'],
        conversionRate: 28.7,
        leads: 181
      },
      {
        id: 'purchase',
        name: 'Compra',
        description: 'Usuario realiza la compra',
        color: 'bg-purple-500',
        automations: ['Proceso de pago', 'Confirmación'],
        conditions: ['Solicita comprar', 'Proporciona datos'],
        conversionRate: 15.4,
        leads: 52
      },
      {
        id: 'retention',
        name: 'Retención',
        description: 'Cliente satisfecho y recurrente',
        color: 'bg-indigo-500',
        automations: ['Seguimiento post-venta', 'Ofertas exclusivas'],
        conditions: ['Compra completada', 'Feedback positivo'],
        conversionRate: 8.2,
        leads: 8
      }
    ]
  }
];

export default function SalesFunnel() {
  const [funnels, setFunnels] = useState<SalesFunnelData[]>(defaultFunnels);
  const [selectedFunnel, setSelectedFunnel] = useState<SalesFunnelData>(defaultFunnels[0]);
  const [showStageModal, setShowStageModal] = useState(false);
  const [editingStage, setEditingStage] = useState<FunnelStage | null>(null);
  const [showFunnelModal, setShowFunnelModal] = useState(false);

  const handleCreateStage = () => {
    setEditingStage(null);
    setShowStageModal(true);
  };

  const handleEditStage = (stage: FunnelStage) => {
    setEditingStage(stage);
    setShowStageModal(true);
  };

  const handleDeleteStage = (stageId: string) => {
    if (confirm('¿Estás seguro de eliminar esta etapa?')) {
      const updatedFunnel = {
        ...selectedFunnel,
        stages: selectedFunnel.stages.filter(stage => stage.id !== stageId)
      };
      setSelectedFunnel(updatedFunnel);
      setFunnels(prev => prev.map(f => f.id === selectedFunnel.id ? updatedFunnel : f));
    }
  };

  const calculateTotalConversion = () => {
    if (selectedFunnel.stages.length === 0) return 0;
    const firstStage = selectedFunnel.stages[0];
    const lastStage = selectedFunnel.stages[selectedFunnel.stages.length - 1];
    return ((lastStage.leads / firstStage.leads) * 100).toFixed(1);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Embudo de Ventas</h1>
            <p className="text-gray-400">Configura y optimiza tus embudos de conversión</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowFunnelModal(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Embudo
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>

      {/* Funnel Selector */}
      <div className="mb-6">
        <div className="flex space-x-2 overflow-x-auto">
          {funnels.map((funnel) => (
            <button
              key={funnel.id}
              onClick={() => setSelectedFunnel(funnel)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedFunnel.id === funnel.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {funnel.name}
            </button>
          ))}
        </div>
      </div>

      {/* Funnel Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Total Leads</p>
              <p className="text-2xl font-bold text-white">{selectedFunnel.totalLeads.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Ingresos</p>
              <p className="text-2xl font-bold text-white">${selectedFunnel.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center">
            <Target className="w-8 h-8 text-purple-500 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Conversión Total</p>
              <p className="text-2xl font-bold text-white">{calculateTotalConversion()}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-orange-500 mr-3" />
            <div>
              <p className="text-gray-400 text-sm">Etapas</p>
              <p className="text-2xl font-bold text-white">{selectedFunnel.stages.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Funnel Visualization */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Visualización del Embudo</h3>
          <button 
            onClick={handleCreateStage}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Etapa
          </button>
        </div>

        <div className="space-y-4">
          {selectedFunnel.stages.map((stage, index) => (
            <div key={stage.id} className="relative">
              <div className="flex items-center">
                <div className={`w-16 h-16 ${stage.color} rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4`}>
                  {index + 1}
                </div>
                
                <div className="flex-1 bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold text-lg">{stage.name}</h4>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEditStage(stage)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteStage(stage.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-600 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">{stage.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Leads</p>
                      <p className="text-white font-semibold">{stage.leads.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Conversión</p>
                      <p className="text-green-400 font-semibold">{stage.conversionRate}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Automatizaciones</p>
                      <p className="text-blue-400 font-semibold">{stage.automations.length}</p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${stage.color}`}
                        style={{ width: `${stage.conversionRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {index < selectedFunnel.stages.length - 1 && (
                <div className="flex justify-center my-2">
                  <ArrowRight className="w-6 h-6 text-gray-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stage Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Automations */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Automatizaciones por Etapa</h3>
          <div className="space-y-4">
            {selectedFunnel.stages.map((stage) => (
              <div key={stage.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className={`w-4 h-4 ${stage.color} rounded-full mr-2`} />
                  <h4 className="text-white font-medium">{stage.name}</h4>
                </div>
                <div className="space-y-2">
                  {stage.automations.map((automation, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                      <span className="text-gray-300">{automation}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Condiciones de Avance</h3>
          <div className="space-y-4">
            {selectedFunnel.stages.map((stage) => (
              <div key={stage.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className={`w-4 h-4 ${stage.color} rounded-full mr-2`} />
                  <h4 className="text-white font-medium">{stage.name}</h4>
                </div>
                <div className="space-y-2">
                  {stage.conditions.map((condition, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                      <span className="text-gray-300">{condition}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="mt-6 bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Análisis de Rendimiento</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Mejor Etapa</h4>
            <p className="text-green-400 font-semibold">Conocimiento (45.2%)</p>
            <p className="text-gray-400 text-sm">Mayor tasa de conversión</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Cuello de Botella</h4>
            <p className="text-red-400 font-semibold">Retención (8.2%)</p>
            <p className="text-gray-400 text-sm">Requiere optimización</p>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Tiempo Promedio</h4>
            <p className="text-blue-400 font-semibold">7.3 días</p>
            <p className="text-gray-400 text-sm">Desde lead hasta venta</p>
          </div>
        </div>
      </div>
    </div>
  );
}