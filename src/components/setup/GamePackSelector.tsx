import React, { useState } from 'react';
import type { GamePack, Round, Question } from '../../types';
import { bearEssentialsRounds } from '../../data/bearEssentials';
import { quirkyQuestionsRounds } from '../../data/quirkyQuestions';

interface Props {
  availablePacks: GamePack[];
  onPackSelected: (pack: GamePack, rounds: Round[]) => void;
  onManagePacks: () => void;
}

export const GamePackSelector: React.FC<Props> = ({
  availablePacks,
  onPackSelected,
  onManagePacks,
}) => {
  const getRoundsForPack = (pack: GamePack): Round[] => {
    // If pack has imported rounds data, use it
    if (pack.rounds && pack.rounds.length > 0) {
      return pack.rounds;
    }
    
    // For the Bear Essentials pack, use real content
    if (pack.name === "Bear Essentials") {
      return bearEssentialsRounds;
    }
    
    // For the Quirky Questions pack, use real content
    if (pack.name === "Quizzlies Quirky Questions Vol 1") {
      return quirkyQuestionsRounds;
    }
    
    // For other packs, create placeholder rounds
    return Array.from({ length: pack.total_rounds }, (_, i) => ({
      round_number: i + 1,
      theme_name: `Round ${i + 1} Theme`,
      questions: [
        {
          type: 'text_answer',
          question: `Sample question 1 for ${pack.name} round ${i + 1}`,
          answer: 'Sample answer',
          points: 1,
        } as Question,
        {
          type: 'multiple_choice',
          question: `Sample multiple choice question for round ${i + 1}`,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          answer: 'Option A',
          points: 1,
        } as Question,
        {
          type: 'true_false',
          question: `This is a true/false question for round ${i + 1}`,
          answer: 'true',
          points: 1,
        } as Question,
      ],
    }));
  };

  const [selectedPack, setSelectedPack] = useState<GamePack | null>(
    availablePacks.length > 0 ? availablePacks[0] : null
  );
  const [previewRounds, setPreviewRounds] = useState<Round[]>(
    availablePacks.length > 0 ? getRoundsForPack(availablePacks[0]) : []
  );

  const handlePackSelect = (pack: GamePack) => {
    setSelectedPack(pack);
    const rounds = getRoundsForPack(pack);
    setPreviewRounds(rounds);
  };

  const handleStartGame = () => {
    if (selectedPack) {
      onPackSelected(selectedPack, previewRounds);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-honey-100 to-forest-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-forest-800 mb-4">
            🐻 Quizzly Bear
          </h1>
          <p className="text-xl text-gray-600">
            Select a quiz pack to get started
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Packs */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-forest-700">
                Quiz Packs
              </h2>
              <button
                onClick={onManagePacks}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                Manage Packs
              </button>
            </div>

            {availablePacks.length > 0 ? (
              <div className="space-y-4">
                {availablePacks.map(pack => {
                  const isSelected = selectedPack?.id === pack.id;
                  return (
                    <div
                      key={pack.id}
                      onClick={() => handlePackSelect(pack)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-honey-500 bg-honey-50' 
                          : 'border-gray-200 hover:border-honey-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-bold text-xl mb-1">{pack.name}</h3>
                          <p className="text-gray-600 mb-2">
                            by {pack.author} • v{pack.version}
                          </p>
                          {pack.description && (
                            <p className="text-sm text-gray-500 mb-2">
                              {pack.description}
                            </p>
                          )}
                          <p className="text-sm font-medium text-forest-600">
                            {pack.total_rounds} rounds
                          </p>
                        </div>
                        {isSelected && (
                          <div className="text-2xl text-honey-500">✓</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  No Quiz Packs Available
                </h3>
                <p className="text-gray-500 mb-4">
                  Import a quiz pack to get started
                </p>
                <button
                  onClick={onManagePacks}
                  className="px-6 py-3 bg-honey-500 text-white rounded-lg hover:bg-honey-600 transition-colors"
                >
                  Import Quiz Pack
                </button>
              </div>
            )}
          </div>

          {/* Pack Preview */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-forest-700 mb-6">
              Preview
            </h2>

            {selectedPack ? (
              <div>
                <div className="mb-6 p-4 bg-honey-50 rounded-lg">
                  <h3 className="text-2xl font-bold text-honey-800 mb-2">
                    {selectedPack.name}
                  </h3>
                  <p className="text-honey-700 mb-3">
                    {selectedPack.description || 'A great quiz pack for your pub quiz night!'}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-honey-600">
                    <span>📚 {selectedPack.total_rounds} rounds</span>
                    <span>👤 {selectedPack.author}</span>
                    <span>🏷️ v{selectedPack.version}</span>
                  </div>
                </div>

                {/* Round Themes Preview */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-700 mb-3">Round Themes:</h4>
                  <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
                    {previewRounds.map((round, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                        <span className="font-medium">Round {round.round_number}:</span> {round.theme_name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Start Button */}
                <button
                  onClick={handleStartGame}
                  className="w-full py-4 bg-forest-500 text-white rounded-lg hover:bg-forest-600 transition-colors font-bold text-lg"
                >
                  🎮 Start New Game
                </button>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-4">👈</div>
                <p>Select a quiz pack to see the preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};