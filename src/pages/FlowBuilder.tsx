import React, { useState } from 'react';
import { Plus, Save, Play, Settings } from 'lucide-react';
import FlowCanvas from '../components/FlowBuilder/FlowCanvas';
import NodePalette from '../components/FlowBuilder/NodePalette';
import FlowPreview from '../components/FlowBuilder/FlowPreview';

export default function FlowBuilder() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Constructor de Flujos</h1>
            <p className="text-gray-400 text-sm">Flujo de Atención al Cliente - WhatsApp</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Play className="w-4 h-4 mr-2" />
              Vista Previa
            </button>
            <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </button>
            <button className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Node Palette */}
        <div className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
          <NodePalette />
        </div>

        {/* Main Canvas */}
        <div className="flex-1 relative">
          <FlowCanvas 
            selectedNode={selectedNode}
            onNodeSelect={setSelectedNode}
          />
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="w-96 bg-gray-800 border-l border-gray-700">
            <FlowPreview onClose={() => setShowPreview(false)} />
          </div>
        )}
      </div>
    </div>
  );
}