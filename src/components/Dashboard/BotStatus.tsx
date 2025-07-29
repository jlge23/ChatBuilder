import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface BotStatusProps {
  metrics: {
    icon: LucideIcon;
    label: string;
    value: string;
    status: 'success' | 'warning' | 'error';
  }[];
}

const statusColors = {
  success: 'text-green-400',
  warning: 'text-yellow-400',
  error: 'text-red-400'
};

export default function BotStatus({ metrics }: BotStatusProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Estado del Bot</h3>
      
      <div className="space-y-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <Icon className={`w-5 h-5 mr-3 ${statusColors[metric.status]}`} />
                <span className="text-gray-300">{metric.label}</span>
              </div>
              <span className={`font-medium ${statusColors[metric.status]}`}>
                {metric.value}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-green-900/20 border border-green-700 rounded-lg">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
          <span className="text-green-400 font-medium">Sistema Operativo</span>
        </div>
        <p className="text-gray-400 text-sm mt-1">
          Todos los servicios funcionando correctamente
        </p>
      </div>
    </div>
  );
}