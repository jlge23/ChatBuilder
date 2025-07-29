import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  change: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const colorClasses = {
  blue: 'text-blue-500 bg-blue-500/10',
  green: 'text-green-500 bg-green-500/10',
  purple: 'text-purple-500 bg-purple-500/10',
  orange: 'text-orange-500 bg-orange-500/10'
};

export default function StatCard({ icon: Icon, title, value, change, color }: StatCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="ml-4">
          <p className="text-gray-400 text-sm">{title}</p>
          <div className="flex items-center">
            <p className="text-2xl font-bold text-white">{value}</p>
            <span className="ml-2 text-sm text-green-400">{change}</span>
          </div>
        </div>
      </div>
    </div>
  );
}