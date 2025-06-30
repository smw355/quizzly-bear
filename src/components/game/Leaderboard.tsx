import React from 'react';
import type { TeamScore } from '../../types';

interface Props {
  scores: TeamScore[];
  roundNumber: number;
  totalRounds: number;
  onNext?: () => void;
}

export const Leaderboard: React.FC<Props> = ({
  scores,
  roundNumber,
  totalRounds,
}) => {
  const getRankEmoji = (position: number) => {
    switch (position) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🐻';
    }
  };

  const getRankColor = (position: number) => {
    switch (position) {
      case 1: return 'bg-yellow-500';
      case 2: return 'bg-gray-500';
      case 3: return 'bg-orange-600';
      default: return 'bg-forest-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-200 to-honey-200 flex flex-col justify-center items-center p-8">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-forest-800 mb-4">
            🏆 Leaderboard 🏆
          </h1>
          <h2 className="text-2xl font-medium text-forest-700">
            After Round {roundNumber} of {totalRounds}
          </h2>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          
          <div className="space-y-4">
            {scores.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No teams found or scores not loaded yet
              </div>
            ) : (
              scores.map((teamScore, index) => {
              const position = index + 1;
              return (
                <div
                  key={teamScore.team_id}
                  className={`${getRankColor(position)} text-white rounded-2xl p-6 flex items-center justify-between shadow-lg transform hover:scale-105 transition-transform`}
                >
                  <div className="flex items-center space-x-6">
                    <div className="text-4xl">
                      {getRankEmoji(position)}
                    </div>
                    <div>
                      <div className="text-3xl font-bold">
                        {teamScore.team_name}
                      </div>
                      <div className="text-lg opacity-90">
                        #{position}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-4xl font-bold">
                      {teamScore.current_score}
                    </div>
                    {teamScore.round_score > 0 && (
                      <div className="text-lg opacity-90">
                        +{teamScore.round_score} this round
                      </div>
                    )}
                  </div>
                </div>
              );
            })
            )}
          </div>
        </div>

        {/* Next Round Info */}
        <div className="text-center">
          {roundNumber < totalRounds ? (
            <div className="bg-honey-500 text-white rounded-2xl p-6 inline-block">
              <p className="text-2xl font-bold mb-2">
                🐻 Ready for Round {roundNumber + 1}?
              </p>
              <p className="text-lg">
                Press Space to continue
              </p>
            </div>
          ) : (
            <div className="bg-green-500 text-white rounded-2xl p-6 inline-block">
              <p className="text-2xl font-bold mb-2">
                🎉 That's all the rounds!
              </p>
              <p className="text-lg">
                Press Space to see final results
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation hint */}
      <div className="fixed bottom-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
        <p className="text-sm">Press Space to continue</p>
      </div>
    </div>
  );
};