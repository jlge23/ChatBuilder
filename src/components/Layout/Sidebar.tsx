import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  GitBranch, 
  MessageCircle, 
  FileText, 
  BarChart3, 
  Settings, 
  Bot,
  TrendingUp,
  X,
  Menu
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: GitBranch, label: 'Constructor de Flujos', path: '/flow-builder' },
  { icon: MessageCircle, label: 'Conversaciones', path: '/conversations' },
  { icon: FileText, label: 'Plantillas', path: '/templates' },
  { icon: TrendingUp, label: 'Embudo de Ventas', path: '/sales-funnel' },
  { icon: BarChart3, label: 'Analíticas', path: '/analytics' },
  { icon: Settings, label: 'Configuración', path: '/settings' },
];

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Bot className="w-8 h-8 text-blue-500" />
            <div>
              <h1 className="text-xl font-bold">ChatBot Builder</h1>
              <p className="text-gray-400 text-sm">WhatsApp Business</p>
            </div>
          </div>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 1024 && onToggle()}
                className={`
                  flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors
                  ${isActive ? 'bg-blue-600 text-white border-r-4 border-blue-400' : ''}
                `}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}