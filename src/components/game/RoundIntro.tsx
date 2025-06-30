import React from 'react';
import type { Round } from '../../types';

interface Props {
  round: Round;
  roundNumber: number;
  totalRounds: number;
  onNext?: () => void;
}

export const RoundIntro: React.FC<Props> = ({
  round,
  roundNumber,
  totalRounds,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-200 to-honey-200 flex flex-col justify-center items-center p-8">
      <div className="w-full max-w-4xl mx-auto text-center">
        {/* Round indicator */}
        <div className="mb-8">
          <h2 className="text-3xl font-medium text-forest-700 mb-2">
            Round {roundNumber} of {totalRounds}
          </h2>
        </div>

        {/* Theme display */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 mb-12">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-800 mb-6">
            {round.theme_name}
          </h1>
          
          {round.theme_description && (
            <p className="text-2xl text-gray-600 italic">
              {round.theme_description}
            </p>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-honey-500 text-white rounded-2xl p-8 inline-block">
          <p className="text-2xl font-medium mb-2">
            🐻 Get ready for {round.questions.length} questions!
          </p>
          <p className="text-lg">
            Press Space when teams are ready
          </p>
        </div>
      </div>

      {/* Navigation hint */}
      <div className="fixed bottom-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
        <p className="text-sm">Press Space to start questions</p>
      </div>
    </div>
  );
};