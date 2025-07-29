import React from 'react';
import { 
  MessageCircle, 
  Users, 
  TrendingUp, 
  Bot,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import StatCard from '../components/Dashboard/StatCard';
import RecentConversations from '../components/Dashboard/RecentConversations';
import BotStatus from '../components/Dashboard/BotStatus';

export default function Dashboard() {
  const stats = [
    {
      icon: MessageCircle,
      title: 'Mensajes Hoy',
      value: '1,247',
      change: '+12%',
      color: 'blue'
    },
    {
      icon: Users,
      title: 'Usuarios Activos',
      value: '342',
      change: '+8%',
      color: 'green'
    },
    {
      icon: TrendingUp,
      title: 'Tasa de Resolución',
      value: '94.5%',
      change: '+2.1%',
      color: 'purple'
    },
    {
      icon: Bot,
      title: 'Respuestas Automáticas',
      value: '892',
      change: '+15%',
      color: 'orange'
    }
  ];

  const botMetrics = [
    { icon: Activity, label: 'Estado del Bot', value: 'Activo', status: 'success' },
    { icon: Clock, label: 'Tiempo de Respuesta', value: '0.8s', status: 'success' },
    { icon: CheckCircle, label: 'Éxito IA', value: '89.2%', status: 'success' },
    { icon: AlertTriangle, label: 'Fallos', value: '3', status: 'warning' }
  ];

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Resumen de actividad de tu chatbot WhatsApp</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bot Status */}
        <div className="lg:col-span-1">
          <BotStatus metrics={botMetrics} />
        </div>

        {/* Recent Conversations */}
        <div className="lg:col-span-2">
          <RecentConversations />
        </div>
      </div>

      {/* AI Configuration Status */}
      <div className="mt-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Configuración Ollama</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Modelo</span>
                <span className="text-green-400 font-medium">llama2</span>
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Servidor</span>
                <span className="text-green-400 font-medium">Conectado</span>
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Temperatura</span>
                <span className="text-blue-400 font-medium">0.7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}