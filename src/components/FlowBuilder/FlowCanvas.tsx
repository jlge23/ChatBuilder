import React, { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';

interface FlowCanvasProps {
  selectedNode: any;
  onNodeSelect: (node: any) => void;
}

interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: { label: string };
}

export default function FlowCanvas({ selectedNode, onNodeSelect }: FlowCanvasProps) {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: '1',
      type: 'start',
      position: { x: 100, y: 100 },
      data: { label: 'Inicio' }
    },
    {
      id: '2',
      type: 'text',
      position: { x: 300, y: 200 },
      data: { label: 'Mensaje de Bienvenida' }
    },
    {
      id: '3',
      type: 'ai_response',
      position: { x: 500, y: 300 },
      data: { label: 'Respuesta IA' }
    }
  ]);

  const [connections, setConnections] = useState([
    { from: '1', to: '2' },
    { from: '2', to: '3' }
  ]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const nodeType = e.dataTransfer.getData('nodeType');
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newNode: Node = {
      id: Date.now().toString(),
      type: nodeType,
      position: { x, y },
      data: { label: `Nuevo ${nodeType}` }
    };

    setNodes(prev => [...prev, newNode]);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const getNodeColor = (type: string) => {
    const colors = {
      start: 'bg-green-600',
      text: 'bg-blue-600',
      ai_response: 'bg-purple-600',
      condition: 'bg-yellow-600',
      template: 'bg-indigo-600'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-600';
  };

  return (
    <div 
      className="w-full h-full bg-gray-900 relative overflow-hidden"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Connection Lines */}
      <svg className="absolute inset-0 pointer-events-none">
        {connections.map((connection, index) => {
          const fromNode = nodes.find(n => n.id === connection.from);
          const toNode = nodes.find(n => n.id === connection.to);
          
          if (!fromNode || !toNode) return null;
          
          return (
            <line
              key={index}
              x1={fromNode.position.x + 60}
              y1={fromNode.position.y + 30}
              x2={toNode.position.x + 60}
              y2={toNode.position.y + 30}
              stroke="#6B7280"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          );
        })}
        
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#6B7280"
            />
          </marker>
        </defs>
      </svg>

      {/* Nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          className={`absolute w-32 h-16 ${getNodeColor(node.type)} rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-transform flex items-center justify-center text-white text-sm font-medium ${
            selectedNode?.id === node.id ? 'ring-2 ring-blue-400' : ''
          }`}
          style={{
            left: node.position.x,
            top: node.position.y
          }}
          onClick={() => onNodeSelect(node)}
        >
          {node.data.label}
          
          {/* Connection points */}
          <div className="absolute -right-2 top-1/2 w-4 h-4 bg-gray-400 rounded-full transform -translate-y-1/2 hover:bg-blue-400 transition-colors" />
          <div className="absolute -left-2 top-1/2 w-4 h-4 bg-gray-400 rounded-full transform -translate-y-1/2 hover:bg-blue-400 transition-colors" />
        </div>
      ))}

      {/* Empty State */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Plus className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-400 mb-2">
              Comienza tu flujo
            </h3>
            <p className="text-gray-500">
              Arrastra componentes desde el panel lateral para crear tu chatbot
            </p>
          </div>
        </div>
      )}
    </div>
  );
}