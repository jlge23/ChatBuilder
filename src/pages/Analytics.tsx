import React from 'react';
import { TrendingUp, MessageCircle, Users, Clock, Bot, CheckCircle } from 'lucide-react';

const metrics = [
  { icon: MessageCircle, label: 'Mensajes Total', value: '12,847', change: '+18%', period: 'vs mes anterior' },
  { icon: Users, label: 'Usuarios Únicos', value: '3,421', change: '+12%', period: 'vs mes anterior' },
  { icon: Clock, label: 'Tiempo Respuesta Promedio', value: '1.2s', change: '-15%', period: 'vs mes anterior' },
  { icon: Bot, label: 'Resolución Automática', value: '87.3%', change: '+5%', period: 'vs mes anterior' },
  { icon: CheckCircle, label: 'Satisfacción Cliente', value: '4.8/5', change: '+2%', period: 'vs mes anterior' },
  { icon: TrendingUp, label: 'Conversiones', value: '23.4%', change: '+8%', period: 'vs mes anterior' }
];

const topIntents = [
  { intent: 'Consulta Pedido', count: 1247, percentage: 32 },
  { intent: 'Soporte Técnico', count: 892, percentage: 23 },
  { intent: 'Información Producto', count: 654, percentage: 17 },
  { intent: 'Facturación', count: 438, percentage: 11 },
  { intent: 'Devoluciones', count: 321, percentage: 8 },
  { intent: 'Otros', count: 295, percentage: 9 }
];

const hourlyData = [
  { hour: '00:00', messages: 45 },
  { hour: '02:00', messages: 23 },
  { hour: '04:00', messages: 12 },
  { hour: '06:00', messages: 34 },
  { hour: '08:00', messages: 156 },
  { hour: '10:00', messages: 234 },
  { hour: '12:00', messages: 287 },
  { hour: '14:00', messages: 198 },
  { hour: '16:00', messages: 245 },
  { hour: '18:00', messages: 189 },
  { hour: '20:00', messages: 134 },
  { hour: '22:00', messages: 87 }
];

export default function Analytics() {
  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Analíticas</h1>
        <p className="text-gray-400">Análisis detallado del rendimiento de tu chatbot</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8 text-blue-500" />
                <span className={`text-sm font-medium ${
                  metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
                <p className="text-gray-400 text-sm">{metric.label}</p>
                <p className="text-gray-500 text-xs mt-1">{metric.period}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Intents */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Intenciones Más Comunes</h3>
          <div className="space-y-4">
            {topIntents.map((intent, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-300 font-medium">{intent.intent}</span>
                    <span className="text-gray-400 text-sm">{intent.count}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${intent.percentage}%` }}
                    />
                  </div>
                </div>
                <span className="text-gray-400 text-sm ml-4 w-12 text-right">
                  {intent.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly Activity */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Actividad por Hora</h3>
          <div className="space-y-3">
            {hourlyData.map((data, index) => (
              <div key={index} className="flex items-center">
                <span className="text-gray-400 text-sm w-12">{data.hour}</span>
                <div className="flex-1 mx-3">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(data.messages / 300) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-gray-300 text-sm w-12 text-right">
                  {data.messages}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Performance */}
      <div className="mt-6 bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Rendimiento de IA (Ollama)</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Respuestas Exitosas</span>
              <span className="text-green-400 font-bold">94.2%</span>
            </div>
            <div className="mt-2 w-full bg-gray-600 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full w-[94%]" />
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Tiempo Procesamiento</span>
              <span className="text-blue-400 font-bold">0.8s</span>
            </div>
            <div className="mt-2 w-full bg-gray-600 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full w-[20%]" />
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Fallbacks</span>
              <span className="text-yellow-400 font-bold">5.8%</span>
            </div>
            <div className="mt-2 w-full bg-gray-600 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full w-[6%]" />
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Modelo Activo</span>
              <span className="text-purple-400 font-bold">Llama2</span>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              Temperatura: 0.7 | Tokens: 2048
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}