import React, { useState, useRef } from 'react';
import type { GamePack } from '../../types';

interface Props {
  availablePacks: GamePack[];
  onPackImported: (pack: GamePack) => void;
  onPackDeleted: (packId: number) => void;
  onPackEdited: (pack: GamePack) => void;
  onBack: () => void;
}

export const PackManagement: React.FC<Props> = ({
  availablePacks,
  onPackImported,
  onPackDeleted,
  onPackEdited,
  onBack,
}) => {
  const [selectedPacks, setSelectedPacks] = useState<Set<number>>(new Set());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePackSelect = (packId: number) => {
    const newSelected = new Set(selectedPacks);
    if (newSelected.has(packId)) {
      newSelected.delete(packId);
    } else {
      newSelected.add(packId);
    }
    setSelectedPacks(newSelected);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) {
      return;
    }

    setImporting(true);
    setImportError(null);

    try {
      const text = await file.text();
      const packData = JSON.parse(text);
      
      // Validate pack structure
      if (!packData.name || !packData.rounds || !Array.isArray(packData.rounds)) {
        throw new Error('Invalid pack format: missing required fields');
      }

      // Create GamePack object with rounds data
      const newPack: GamePack = {
        id: Date.now(), // Temporary ID
        name: packData.name,
        version: packData.version || '1.0',
        author: packData.author || 'Unknown',
        description: packData.description || '',
        total_rounds: packData.rounds.length,
        rounds: packData.rounds, // Store the actual rounds data
        active: true,
        created_at: new Date().toISOString(),
      };
      
      await onPackImported(newPack);
    } catch (error) {
      console.error('Import error:', error);
      setImportError(error instanceof Error ? error.message : 'Failed to import pack');
    } finally {
      setImporting(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleExportSelected = () => {
    if (selectedPacks.size === 0) return;

    selectedPacks.forEach(packId => {
      const pack = availablePacks.find(p => p.id === packId);
      if (pack) {
        const exportData = {
          name: pack.name,
          version: pack.version,
          author: pack.author,
          description: pack.description,
          rounds: pack.rounds || [], // Include actual rounds data if available
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `${pack.name.replace(/\s+/g, '_').toLowerCase()}_v${pack.version}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
      }
    });
  };

  const handleDeletePack = (packId: number) => {
    onPackDeleted(packId);
    setShowDeleteConfirm(null);
    setSelectedPacks(prev => {
      const newSet = new Set(prev);
      newSet.delete(packId);
      return newSet;
    });
  };

  const handleBrowseCommunityPacks = () => {
    if (typeof window !== 'undefined' && window.electronAPI) {
      // In Electron, open external URL
      window.electronAPI.openExternal('https://github.com/smw355/quizzly-bear/tree/main/community-packs');
    } else {
      // Fallback for web browsers
      window.open('https://github.com/smw355/quizzly-bear/tree/main/community-packs', '_blank');
    }
  };

  const getPackStats = (pack: GamePack) => {
    // TODO: Get real usage stats from database
    return {
      timesUsed: Math.floor(Math.random() * 50),
      lastUsed: pack.created_at ? new Date(pack.created_at).toLocaleDateString() : 'Never',
      totalQuestions: pack.total_rounds * 6, // Assume 6 questions per round
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-honey-100 to-forest-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-forest-800 mb-2">
              📦 Pack Management
            </h1>
            <p className="text-lg text-gray-600">
              Import, export, and manage your quiz packs
            </p>
          </div>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← Back to Game
          </button>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleImportClick}
                disabled={importing}
                className="px-6 py-3 bg-forest-500 text-white rounded-lg hover:bg-forest-600 disabled:bg-gray-400 transition-colors"
              >
                {importing ? '📥 Importing...' : '📥 Import Pack'}
              </button>
              
              <button
                onClick={handleExportSelected}
                disabled={selectedPacks.size === 0}
                className="px-6 py-3 bg-honey-500 text-white rounded-lg hover:bg-honey-600 disabled:bg-gray-400 transition-colors"
              >
                📤 Export Selected ({selectedPacks.size})
              </button>

              <button
                onClick={() => onPackEdited({} as GamePack)} // TODO: Implement pack creation
                className="px-6 py-3 bg-honey-800 text-white rounded-lg hover:bg-honey-900 transition-colors"
              >
                ➕ Create New Pack
              </button>

              <button
                onClick={handleBrowseCommunityPacks}
                className="px-6 py-3 rounded-lg transition-colors text-white"
                style={{ backgroundColor: '#800000' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#660000'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#800000'}
              >
                🌐 Browse Community Packs
              </button>
            </div>

            <div className="text-sm text-gray-600">
              {availablePacks.length} pack{availablePacks.length !== 1 ? 's' : ''} installed
            </div>
          </div>

          {/* Import Error */}
          {importError && (
            <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg">
              <div className="flex items-start">
                <span className="text-red-500 mr-2">⚠️</span>
                <div>
                  <p className="font-medium text-red-800">Import Failed</p>
                  <p className="text-red-700 text-sm">{importError}</p>
                </div>
              </div>
            </div>
          )}

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileImport}
            className="hidden"
          />
        </div>

        {/* Pack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availablePacks.map(pack => {
            const stats = getPackStats(pack);
            const isSelected = selectedPacks.has(pack.id!);
            
            return (
              <div
                key={pack.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl ${
                  isSelected ? 'ring-2 ring-honey-500' : ''
                }`}
              >
                {/* Pack Header */}
                <div className="p-6 border-b">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {pack.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        by {pack.author} • v{pack.version}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePackSelect(pack.id!)}
                        className={`p-2 rounded-lg transition-colors ${
                          isSelected 
                            ? 'bg-honey-500 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {isSelected ? '✓' : '○'}
                      </button>
                    </div>
                  </div>
                  
                  {pack.description && (
                    <p className="text-sm text-gray-600 mb-3">
                      {pack.description}
                    </p>
                  )}

                  <div className="flex items-center text-sm text-forest-600">
                    <span>📚 {pack.total_rounds} rounds</span>
                    <span className="mx-2">•</span>
                    <span>❓ {stats.totalQuestions} questions</span>
                  </div>
                </div>

                {/* Pack Stats */}
                <div className="p-4 bg-gray-50">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Used:</span>
                      <p className="text-gray-600">{stats.timesUsed} times</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Last used:</span>
                      <p className="text-gray-600">{stats.lastUsed}</p>
                    </div>
                  </div>
                </div>

                {/* Pack Actions */}
                <div className="p-4 flex justify-between">
                  <button
                    onClick={() => onPackEdited(pack)}
                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                  >
                    ✏️ Edit
                  </button>
                  
                  {pack.name !== "Bear Essentials" && ( // Don't allow deleting default pack
                    <button
                      onClick={() => setShowDeleteConfirm(pack.id!)}
                      className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
                    >
                      🗑️ Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {availablePacks.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No Quiz Packs Installed
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Import existing quiz packs or create new ones to get started with your quiz library.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleImportClick}
                className="px-6 py-3 bg-forest-500 text-white rounded-lg hover:bg-forest-600 transition-colors"
              >
                📥 Import Your First Pack
              </button>
              <button
                onClick={() => onPackEdited({} as GamePack)}
                className="px-6 py-3 bg-honey-800 text-white rounded-lg hover:bg-honey-900 transition-colors"
              >
                ➕ Create New Pack
              </button>
              <button
                onClick={handleBrowseCommunityPacks}
                className="px-6 py-3 rounded-lg transition-colors text-white"
                style={{ backgroundColor: '#800000' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#660000'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#800000'}
              >
                🌐 Browse Community Packs
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md mx-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Delete Quiz Pack?
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this quiz pack? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeletePack(showDeleteConfirm)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete Pack
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};