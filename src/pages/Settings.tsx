import React, { useState } from 'react';
import { Save, Key, Server, Bot, Webhook } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    whatsapp: {
      accessToken: '',
      verifyToken: '',
      phoneNumberId: '',
      webhookUrl: 'https://your-app.com/webhook'
    },
    ollama: {
      serverUrl: 'http://localhost:11434',
      model: 'llama2',
      temperature: 0.7,
      maxTokens: 2048
    },
    general: {
      companyName: 'Mi Empresa',
      welcomeMessage: '¡Hola! Bienvenido a nuestro servicio de atención al cliente.',
      fallbackMessage: 'Lo siento, no pude entender tu mensaje. ¿Podrías reformularlo?'
    }
  });

  const handleSave = () => {
    console.log('Guardando configuración:', settings);
    // Aquí se guardaría en el backend
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Configuración</h1>
          <p className="text-gray-400">Configura tu bot de WhatsApp Business y la integración con Ollama</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* WhatsApp Configuration */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-6">
              <Webhook className="w-6 h-6 text-green-500 mr-3" />
              <h2 className="text-xl font-semibold text-white">WhatsApp Business API</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Access Token
                </label>
                <input
                  type="password"
                  value={settings.whatsapp.accessToken}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    whatsapp: { ...prev.whatsapp, accessToken: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Tu token de acceso de Meta"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Verify Token
                </label>
                <input
                  type="text"
                  value={settings.whatsapp.verifyToken}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    whatsapp: { ...prev.whatsapp, verifyToken: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Token de verificación"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Phone Number ID
                </label>
                <input
                  type="text"
                  value={settings.whatsapp.phoneNumberId}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    whatsapp: { ...prev.whatsapp, phoneNumberId: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="ID del número de teléfono"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Webhook URL
                </label>
                <input
                  type="url"
                  value={settings.whatsapp.webhookUrl}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    whatsapp: { ...prev.whatsapp, webhookUrl: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Ollama Configuration */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-6">
              <Bot className="w-6 h-6 text-purple-500 mr-3" />
              <h2 className="text-xl font-semibold text-white">Configuración Ollama</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  URL del Servidor
                </label>
                <input
                  type="url"
                  value={settings.ollama.serverUrl}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    ollama: { ...prev.ollama, serverUrl: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Modelo
                </label>
                <select
                  value={settings.ollama.model}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    ollama: { ...prev.ollama, model: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="llama2">Llama 2</option>
                  <option value="codellama">Code Llama</option>
                  <option value="mistral">Mistral</option>
                  <option value="neural-chat">Neural Chat</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Temperatura: {settings.ollama.temperature}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={settings.ollama.temperature}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    ollama: { ...prev.ollama, temperature: parseFloat(e.target.value) }
                  }))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Max Tokens
                </label>
                <input
                  type="number"
                  value={settings.ollama.maxTokens}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    ollama: { ...prev.ollama, maxTokens: parseInt(e.target.value) }
                  }))}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* General Settings */}
          <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-6">
              <Key className="w-6 h-6 text-blue-500 mr-3" />
              <h2 className="text-xl font-semibold text-white">Configuración General</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Nombre de la Empresa
                </label>
                <input
                  type="text"
                  value={settings.general.companyName}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    general: { ...prev.general, companyName: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Mensaje de Bienvenida
                </label>
                <textarea
                  value={settings.general.welcomeMessage}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    general: { ...prev.general, welcomeMessage: e.target.value }
                  }))}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Mensaje de Fallback
                </label>
                <textarea
                  value={settings.general.fallbackMessage}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    general: { ...prev.general, fallbackMessage: e.target.value }
                  }))}
                  rows={2}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Connection Status */}
        <div className="mt-6 bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Estado de Conexiones</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <span className="text-gray-300">WhatsApp API</span>
              <span className="text-yellow-400">Desconectado</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <span className="text-gray-300">Ollama Server</span>
              <span className="text-red-400">Sin conexión</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <span className="text-gray-300">Webhook</span>
              <span className="text-gray-400">No configurado</span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-5 h-5 mr-2" />
            Guardar Configuración
          </button>
        </div>
      </div>
    </div>
  );
}